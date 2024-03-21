import axios from "axios";
import moment from "moment";
import React from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import toastr from "toastr";

export const getFile = (filename) => {
   let apiUrl = "http://192.168.176.193:8002";
   if (process.env.NODE_ENV === "development") {
      new EventSource("http://localhost:8081/esbuild").addEventListener("change", () => location.reload());
      apiUrl = "http://localhost:8080";
   }

   return `${apiUrl}/getfile/images/${filename}`;
};

const abortSignal = (timeoutMs) => {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
};

const hapus = async (url, id, custom = {}) => {
   const formData = {
      id,
      ...custom,
   };

   try {
      return await post(url, formData);
   } catch (e) {
      notification(false, e.code, e.message);
   }
};

export const get = async (url, dynamic = false) => {
   try {
      const mutex = {
         locked: false,
         lock() {
            if (this.locked) {
               // Menunggu sampai sumber daya tersedia
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(this.lock());
                  }, 10);
               });
            } else {
               this.locked = true;
               return Promise.resolve();
            }
         },
         unlock() {
            this.locked = false;
         },
      };

      await mutex.lock();

      const send = axios.get(dynamic ? url : `${window.location.pathname}${url}`, {
         signal: abortSignal(10_000),
      });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && parse("code", data) !== 200) {
            notification(false, data.message, error_code_http(data.code));
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            notification(false, "Sistem sedang sibuk, silahkan coba beberapa saat lagi!", e.code);
         } else {
            notification(false, e.message, error_code_http(e.response.status));
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      // error
   }
};

export const notification = (status, msg_response, title) => {
   toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: "toast-top-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
   };

   if (status) {
      toastr.success(msg_response);
   } else {
      toastr.error(msg_response, title);
   }
};

export const error_code_http = (code) => {
   const config = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      122: "Request-URI too long",
      127: "Network Authentication Required",
      150: "Continue",
      151: "Switching Protocols",
      152: "Processing",
      153: "Early Hints",
      158: "Request-URI too long",
      159: "Network Authentication Required",
      180: "Continue",
      181: "Switching Protocols",
      182: "Processing",
      183: "Early Hints",
      188: "Request-URI too long",
      189: "Network Authentication Required",
      199: "Network Authentication Required",
      200: "OK",
      201: "Created",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      250: "Continue",
      251: "Switching Protocols",
      252: "Processing",
      253: "Early Hints",
      258: "Request-URI too long",
      259: "Network Authentication Required",
      299: "Network Authentication Required",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      310: "Too many Redirect",
      399: "Client Closed Request",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      499: "Client Closed Request",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required",
      599: "Network Authentication Required",
   };

   return typeof config[code] === "undefined" ? "Terjadi sesuatu kesalahan" : config[code];
};

export const parse = (key, content = {}, type = "text") => {
   if (typeof content[key] === "undefined") {
      return "";
   }
   let text = content[key];
   if (text == null || text == "") {
      return "";
   }
   text = text.toString();
   if (type === "date" && valid_date(text)) {
      moment.locale("id");
      if (text !== "-") return moment(text).format("DD MMMM YYYY");
   }
   if (text.slice(0, 1) == "0") {
      return text.replace(/^(?:\s+|\s+)$/gm, "");
   }
   if (text.replace(/\d/gm, "").length > 0) {
      return text;
   }
   return toInt(text) > 0 ? toInt(text) : text.replace(/^(?:\s+|\s+)$/gm, "");
};

export const toInt = (string) => {
   return isNaN(parseFloat(string)) ? 0 : parseFloat(string);
};

export const arrLength = (content = []) => {
   return content.length > 0;
};

export const objLength = (content = {}) => {
   return Object.keys(content).length > 0;
};

export const is_invalid = (key, object = {}) => {
   return !!parse(key, object);
};

export const msg_response = (key, object = {}) => {
   if (parse(key, object)) {
      return <Form.Control.Feedback type="invalid">{parse(key, object)}</Form.Control.Feedback>;
   }
};

export const post = async (url, form = [], config = {}, dynamic = false) => {
   try {
      const mutex = {
         locked: false,
         lock() {
            if (this.locked) {
               // Menunggu sampai sumber daya tersedia
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(this.lock());
                  }, 10);
               });
            } else {
               this.locked = true;
               return Promise.resolve();
            }
         },
         unlock() {
            this.locked = false;
         },
      };

      await mutex.lock();
      const formData = new FormData();
      Object.keys(form).forEach((data) => formData.append(data, form[data]));

      const send = axios.post(dynamic ? url : `${window.location.pathname}${url}`, formData, { ...config, signal: abortSignal(20_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && parse("code", data) !== 200) {
            notification(false, data.message, error_code_http(data.code));
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            notification(false, "Sistem sedang sibuk, silahkan coba beberapa saat lagi!", e.code);
         } else {
            notification(false, e.message, error_code_http(e.response.status));
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      // error
   }
};

export const serialize = (obj) => {
   const str = [];
   for (const p in obj) {
      if (Object.hasOwn(obj, p)) {
         str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
      }
   }
   return str.join("&");
};

export const confirmDelete = async ({ ...content }) => {
   const res = await Swal.fire({
      text: parse("message", content) ? content.message : "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Iya, hapus!",
      cancelButtonText: "Tidak, batal",
      customClass: {
         confirmButton: "btn btn-sm fw-bold btn-danger",
         cancelButton: "btn btn-sm fw-bold btn-primary",
      },
   });
   return res.isConfirmed ? hapus(content.url, content.id, content.custom) : { data: { status: false, msg_response: "Data batal dihapus." } };
};

export const renderArray = (array, nilai) => {
   const booleanItem = array.find((item) => item.value === nilai);

   return booleanItem ? booleanItem.label : "-";
};

export const getYoutubeVideoId = (url) => {
   const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]{11}).*/;
   const match = url.match(regExp);
   return match?.[1] ? match[1] : null;
};

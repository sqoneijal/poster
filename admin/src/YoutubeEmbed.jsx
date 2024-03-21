import PropTypes from "prop-types";
import React from "react";

const YoutubeEmbed = ({ embedId }) => (
   <div className="video-responsive">
      <iframe
         src={`https://www.youtube.com/embed/${embedId}`}
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
      />
   </div>
);

YoutubeEmbed.propTypes = {
   embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;

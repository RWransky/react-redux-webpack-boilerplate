import React from 'react';

const GithubButton = (props) => {
  const {user, repo, type, width, height, count, large} = props;
  let src = `https://ghbtns.com/github-btn.html?user=${user}`;
  if (repo) {
    src += `&repo=${repo}&type=${type}`;
  } else {
    src += `&type=${type}`;
  }
  if (count) src += '&count=true';
  if (large) src += '&size=large';

  return (
    <iframe
      src={src}
      frameBorder="0"
      allowTransparency="true"
      scrolling="0"
      width={width}
      height={height}
      style={{border: 'none', width: width, height: height}}></iframe>
  );
};

GithubButton.propTypes = {
  user: React.PropTypes.string.isRequired,
  repo: React.PropTypes.string,
  type: React.PropTypes.oneOf(['star', 'watch', 'fork', 'follow']).isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  count: React.PropTypes.bool,
  large: React.PropTypes.bool
};

export default GithubButton;

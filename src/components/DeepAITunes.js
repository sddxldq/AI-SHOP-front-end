import React from 'react'

const DeepAITunes = ({ onData }) => {
    const handleDeepAIStyleClick = (event) => {
        onData.handleDeepAIImageStyle(event.target.value)
      };
    return (
        <div className="DeepAISelectorArea">
        <p class="text-left ml-10 font-semibold">Please select image style</p>
        <select className="select w-56 max-w-xs ml-4" value={onData.deepAIImageStyle} onChange={handleDeepAIStyleClick}>
          <option disabled defaultValue>image style</option>
          <option value="text2img">text-to-image</option>
          <option value="comics-portrait">comics portrait</option>
          <option value="fantasy-world-generator">fantasy</option>
          <option value="cute-creature-generator">cute-creature</option>
          <option value="cyberpunk-generator">cyberpunk</option>
          <option value="anime-portrait-generator">anime-portrait</option>
          <option value="old-style-generator">old-style</option>
          <option value="renaissance-painting-generator">renaissance-painting</option>
          <option value="abstract-painting-generator">abstract-painting</option>
          <option value="impressionism-painting-generator">impressionism-painting</option>
          <option value="surreal-graphics-generator">surreal-graphics</option>
          <option value="3d-objects-generator">3d-objects</option>
          <option value="origami-3d-generator">origami-3d</option>
        </select>
      </div>
    )
  }
  
  export default DeepAITunes
import React from 'react'

const Toggles = ({ onData }) => {
    const handleTranslateClick = (event) => {
        onData.handleTranslate(event.target.value)
      };
    const handleRephraseClick = () => {
        onData.handleRephrase()
      };
    const handleSummarizeClick = () => {
        onData.handleSummarize()
    };
    const handleRandomizedClick = () => {
        onData.handleRandomized()
    };
    return (
        <div className="toggleArea">
        <select className="select w-48 max-w-xs" value={onData.translate} onChange={handleTranslateClick}>
          <option disabled defaultValue>Translate into</option>
          <option value="">No translation</option>
          <option value="Chinese">中文</option>
          <option value="Française">Française</option>
          <option value="Español">Español</option>
        </select>
        <div className="form-control w-36">
          <label className="cursor-pointer label">
            <span className="label-text">Rephrase</span> 
            <input type="checkbox" className="toggle toggle-secondary" checked={onData.rephrase} onChange={handleRephraseClick}/>
          </label>
        </div>
        <div className="form-control w-36">
          <label className="cursor-pointer label">
            <span className="label-text">Summarize</span> 
            <input type="checkbox" className="toggle toggle-primary" checked={onData.summarize} onChange={handleSummarizeClick}/>
          </label>
        </div>
        <div className="form-control w-36">
          <label className="cursor-pointer label">
            <span className="label-text">Randomized</span> 
            <input type="checkbox" className="toggle toggle-accent" checked={onData.randomized} onChange={handleRandomizedClick}/>
          </label>
        </div>
      </div>
    )
  }
  
  export default Toggles
import React from 'react'

const Toggles = () => {
    return (
        <div className="toggleArea">
        <select className="select w-48 max-w-xs">
          <option disabled selected>Translate into</option>
          <option>Chinese</option>
          <option>Française</option>
          <option>Español</option>
        </select>
        <div className="form-control w-36">
          <label className="cursor-pointer label">
            <span className="label-text">Rephrase</span> 
            <input type="checkbox" className="toggle toggle-secondary" checked />
          </label>
        </div>
        <div className="form-control w-36">
          <label className="cursor-pointer label">
            <span className="label-text">Summarize</span> 
            <input type="checkbox" className="toggle toggle-accent" checked />
          </label>
        </div>
        <div className="form-control w-36">
          <label className="cursor-pointer label">
            <span className="label-text">Randomized</span> 
            <input type="checkbox" className="toggle toggle-accent" checked />
          </label>
        </div>
      </div>
    )
  }
  
  export default Toggles
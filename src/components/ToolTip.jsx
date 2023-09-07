import React from 'react'

function ToolTip({text}) {
  return (
    <div class="tooltip">
        <span class="tooltiptext">{text}</span>
    </div>
  )
}

export default ToolTip
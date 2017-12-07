export default function (animID, circID, dur) {
  const res =
  `<svg id="rip1" style="height: 100%; width:100%;" xmlns="http://www.w3.org/2000/svg" version="1.1" viewPort="0 0 200 100" viewBox="0 0 200 100" preserveAspectRatio="none">
    <rect x="0" y="0" width="100%" height="100"
          fill="none" stroke="blue" stroke-width=".1"  />
    <g>
      <circle id="${circID}" r="0" cx="100" cy="50" stroke="#ffffff" stroke-width="4px"  opacity=".3" fill="#000000">
      <animate id="${animID}" attributeName="r" attributeType="XML"
                values="1;100;1"
               begin="indefinite" dur=""${dur}"s"
               fill="remove"/>


      </circle>
    </g>
  </svg>`
  return res
}

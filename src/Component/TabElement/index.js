import './index.css'

const TabElement = props => {
  const {tabDetails, tabClicked, selectedTabImgs, tabsList} = props
  const {tabId, displayText} = tabDetails
  const handleClick = () => {
    tabClicked(tabId)
  }
  const tabDec =
    tabDetails.tabId === selectedTabImgs ? 'selectedTab' : 'non-selectedTab'
  return (
    <li className="tab">
      <button className={tabDec} onClick={handleClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TabElement

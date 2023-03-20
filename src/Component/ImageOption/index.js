import './index.css'

const ImageOption = props => {
  const {optionDetails, answerClicked} = props
  const {id, thumbnailUrl, category} = optionDetails
  const handleClick = () => {
    answerClicked(id)
  }
  return (
    <li className="btnImgContainer">
      <button className="imgBtn" onClick={handleClick}>
        <img className="image" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageOption

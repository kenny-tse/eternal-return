import Card from '@mui/material/Card';

const CharacterCard = function (props) {
  return (
    <Card variant="outlined" className="character-card">
      <div className="card-name">{props.name}</div>

    </Card>
  )
}
export default CharacterCard;
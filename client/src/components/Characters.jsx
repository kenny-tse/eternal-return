import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard"

let arrayOfCharacters = ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9", "name10", "name11", "name12"]

const Characters = function (props) {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setCharacters(
      arrayOfCharacters.map((individualCharacterStats) => {
        return <CharacterCard name={individualCharacterStats} />;
      })
    )

  }, [])

  return (
    <container>
      <header className="main-page-headers">
        Characters
      </header>
      <body>
        <div className="character-grid-container">
          {characters}
        </div>
      </body>
    </container>
  )
}
export default Characters;
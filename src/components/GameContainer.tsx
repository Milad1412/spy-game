import { Fragment, useCallback, useEffect, useState } from 'react'
import StartGame from './StartGame'
import { objects } from '../data/objects'

const GameContainer = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [selectedWord, setSelectedWord] = useState('')
  const [spies, setSpies] = useState<number | null>(null)
  const [allPlayers, setAllPlayers] = useState<number | null>(null)
  const [playedWords, setPlayedWords] = useState(objects)
  const [arrayOfSpies, setArrayOfSpies] = useState<number[]>([])
  const [arrayOfAllPlayers, setArrayOfAllPlayers] = useState<number[]>([])
  const [isSpy, setIsSpy] = useState(false)
  const [isRoleDisplayed, setIsRoleDisplayed] = useState(false)

  const generateUniqueRandomNumbers = (spies: number, all: number) => {
    let allArr = Array(all)
      .fill(0)
      .map((_item, i) => i + 1)

    const randomNums = []

    let count = 0

    while (count < spies) {
      count++
      let randomNumber = Math.floor(Math.random() * allArr.length)
      randomNums.push(allArr[randomNumber])
      const indexOfRandomNumber = allArr.findIndex(
        (item) => item === allArr[randomNumber]
      )
      allArr.splice(indexOfRandomNumber, 1)
    }
    setArrayOfSpies(randomNums)
  }

  useEffect(() => {
    if (isGameStarted) {
      const randomWord = Math.floor(Math.random() * playedWords.length)
      setSelectedWord(objects[randomWord])
      const clonedPlayedWords = [...playedWords]
      clonedPlayedWords.splice(randomWord, 1)
      setPlayedWords(clonedPlayedWords)
    }
  }, [isGameStarted])

  useEffect(() => {
    generateUniqueRandomNumbers(spies as number, allPlayers as number)
  }, [spies])

  useEffect(() => {
    setArrayOfAllPlayers(
      Array(allPlayers)
        .fill(0)
        .map((_item, i) => i + 1)
    )
  }, [allPlayers])

  const handleSpySelection = useCallback(
    (value: number) => {
      setSpies(value)
    },
    [spies]
  )

  const handlePlayerSelection = useCallback(
    (value: number) => {
      setAllPlayers(value)
    },
    [allPlayers]
  )

  const handleRoleSelection = (value: number) => {
    setIsRoleDisplayed(true)
    // arrayOfAllPlayers.pop()
    if (arrayOfSpies.includes(value)) {
      setIsSpy(true)
    } else {
      setIsSpy(false)
    }
  }

  const handleNextRole = () => {
    setIsRoleDisplayed(false)
    arrayOfAllPlayers.pop()
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {!isGameStarted && (
        <StartGame
          onGameStart={() => setIsGameStarted(true)}
          onSelectSpies={handleSpySelection}
          onSelectAllPlayers={handlePlayerSelection}
        />
      )}
      {isGameStarted && arrayOfAllPlayers.length !== 0 && (
        <div className="h-full w-full flex items-center justify-center">
          {!isRoleDisplayed && (
            <button
              className="h-[70%] w-[80%] border border-gray-500 rounded-md text-center font-medium text-gray-300 text-3xl hover:text-gray-500"
              onClick={() =>
                handleRoleSelection(arrayOfAllPlayers.at(-1) as number)
              }
            >
              نمایش نقش
            </button>
          )}

          {isRoleDisplayed && (
            <div className="flex flex-col items-center justify-center h-[70%] w-[80%] border border-gray-500 rounded-md">
              {isSpy && (
                <p className="text-2xl pb-7 text-red-300">شما جاسوس هستید</p>
              )}
              {!isSpy && (
                <p className="text-2xl pb-7 text-gray-300">{selectedWord}</p>
              )}

              <button
                className="bg-gray-700 px-4 py-2 rounded-md outline-none"
                onClick={handleNextRole}
              >
                نمایش بعدی
              </button>
            </div>
          )}
        </div>
      )}
      {isGameStarted && arrayOfAllPlayers.length === 0 && (
        <button
          className="text-2xl text-gray-300 bg-stone-600 px-4 py-2 rounded-md outline-none"
          onClick={() => {
            setIsGameStarted(false)
            generateUniqueRandomNumbers(1, 3)
            setArrayOfAllPlayers(
              Array(allPlayers)
                .fill(0)
                .map((_item, i) => i + 1)
            )
          }}
        >
          اتمام بازی و شروع بازی جدید
        </button>
      )}
    </div>
  )
}

export default GameContainer

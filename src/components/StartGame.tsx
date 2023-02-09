import { memo, useEffect, useState } from 'react'

type StartGameProps = {
  onGameStart: () => void
  onSelectSpies: (spies: number) => void
  onSelectAllPlayers: (allPlayers: number) => void
}

const StartGame: React.FC<StartGameProps> = ({
  onGameStart,
  onSelectAllPlayers,
  onSelectSpies,
}) => {
  const [numberOfAllPlayers, setNumberOfAllPlayers] = useState(
    JSON.parse(localStorage.getItem('allPlayers') as string)
      ? JSON.parse(localStorage.getItem('allPlayers') as string)
      : 3
  )
  const [numberOfSpies, setNumberOfSpies] = useState(
    JSON.parse(localStorage.getItem('spyPlayers') as string)
      ? JSON.parse(localStorage.getItem('spyPlayers') as string)
      : 1
  )

  useEffect(() => {
    onSelectAllPlayers(numberOfAllPlayers)
    localStorage.setItem('allPlayers', JSON.stringify(numberOfAllPlayers))
  }, [numberOfAllPlayers])

  useEffect(() => {
    onSelectSpies(numberOfSpies)
    localStorage.setItem('spyPlayers', JSON.stringify(numberOfSpies))
  }, [numberOfSpies])

  const decrementAllPlayers = () => {
    if (numberOfAllPlayers > 3 && numberOfSpies * 2 < numberOfAllPlayers - 1) {
      setNumberOfAllPlayers((prevState: number) => prevState - 1)
    }
  }

  const incrementAllPlayers = () => {
    setNumberOfAllPlayers((prevState: number) => prevState + 1)
  }

  const decrementNumberOfSpies = () => {
    if (numberOfSpies > 1) {
      setNumberOfSpies((prevState: number) => prevState - 1)
    }
  }

  const incrementNumberOfSpies = () => {
    if (
      numberOfAllPlayers !== 3 &&
      numberOfAllPlayers !== 4 &&
      numberOfSpies * 2 < numberOfAllPlayers - 1
    ) {
      setNumberOfSpies((prevState: number) => prevState + 1)
    }
  }

  return (
    <div className="flex flex-col justify-between p-4 h-full w-full">
      <div>
        {/* select number of whole players */}
        <div className="pb-8">
          <p className="pb-3 text-2xl">تعداد کل بازیکنان</p>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center leading-none bg-gray-400 w-14 h-14 text-gray-900 rounded-md text-3xl"
              onClick={incrementAllPlayers}
            >
              +
            </div>
            <div className="text-3xl">{numberOfAllPlayers}</div>
            <div
              className="flex items-center justify-center leading-none bg-gray-400 w-14 h-14 text-gray-900 rounded-md text-3xl"
              onClick={decrementAllPlayers}
            >
              -
            </div>
          </div>
        </div>

        {/* select number of spies */}
        <div>
          <p className="pb-3 text-2xl">تعداد جاسوس ها</p>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center leading-none bg-gray-400 w-14 h-14 text-gray-900 rounded-md text-3xl"
              onClick={incrementNumberOfSpies}
            >
              +
            </div>
            <div className="text-3xl">{numberOfSpies}</div>
            <div
              className="flex items-center justify-center leading-none bg-gray-400 w-14 h-14 text-gray-900 rounded-md text-3xl"
              onClick={decrementNumberOfSpies}
            >
              -
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex items-center">
        <button
          onClick={onGameStart}
          className="w-full h-12 bg-green-800 text-2xl rounded-lg text-white flex items-center justify-center"
        >
          شروع بازی
        </button>
      </div>
    </div>
  )
}

export default memo(StartGame)

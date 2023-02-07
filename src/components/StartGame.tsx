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
  const [numberOfAllPlayers, setNumberOfAllPlayers] = useState(3)
  const [numberOfSpies, setNumberOfSpies] = useState(1)

  useEffect(() => {
    onSelectAllPlayers(numberOfAllPlayers)
  }, [numberOfAllPlayers])

  useEffect(() => {
    onSelectSpies(numberOfSpies)
  }, [numberOfSpies])

  const decrementAllPlayers = () => {
    if (numberOfAllPlayers > 3 && numberOfSpies * 2 < numberOfAllPlayers - 1) {
      setNumberOfAllPlayers((prevState) => prevState - 1)
    }
  }

  const incrementAllPlayers = () => {
    setNumberOfAllPlayers((prevState) => prevState + 1)
  }

  const decrementNumberOfSpies = () => {
    if (numberOfSpies > 1) {
      setNumberOfSpies((prevState) => prevState - 1)
    }
  }

  const incrementNumberOfSpies = () => {
    if (
      numberOfAllPlayers !== 3 &&
      numberOfAllPlayers !== 4 &&
      numberOfSpies * 2 < numberOfAllPlayers - 1
    ) {
      setNumberOfSpies((prevState) => prevState + 1)
    }
  }

  return (
    <div className="flex flex-col justify-between p-4 h-full w-full">
      <div>
        {/* select number of whole players */}
        <div className="pb-8">
          <p className="pb-3">تعداد کل بازیکنان</p>
          <div className="flex items-center justify-between">
            <div
              className="text-center leading-none bg-gray-400 w-8 h-8 text-gray-900 rounded-md text-2xl"
              onClick={incrementAllPlayers}
            >
              +
            </div>
            <div>{numberOfAllPlayers}</div>
            <div
              className="text-center leading-none bg-gray-400 w-8 h-8 text-gray-900 rounded-md text-2xl"
              onClick={decrementAllPlayers}
            >
              -
            </div>
          </div>
        </div>

        {/* select number of spies */}
        <div>
          <p className="pb-3">تعداد جاسوس ها</p>
          <div className="flex items-center justify-between">
            <div
              className="text-center leading-none bg-gray-400 w-8 h-8 text-gray-900 rounded-md text-2xl"
              onClick={incrementNumberOfSpies}
            >
              +
            </div>
            <div>{numberOfSpies}</div>
            <div
              className="text-center leading-none bg-gray-400 w-8 h-8 text-gray-900 rounded-md text-2xl"
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
          className="w-full h-12 bg-green-800 rounded-lg text-white flex items-center justify-center"
        >
          شروع بازی
        </button>
      </div>
    </div>
  )
}

export default memo(StartGame)

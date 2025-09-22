import { useState, memo, useCallback, useMemo, useRef } from 'react'
import { useEffect } from 'react'

import IconButton from '../UI/IconButton.jsx'
import MinusIcon from '../UI/Icons/MinusIcon.jsx'
import PlusIcon from '../UI/Icons/PlusIcon.jsx'
import CounterOutput from './CounterOutput.jsx'
import CounterHistory from './CounterHistory.jsx'
import { log } from '../../log.js'

function isPrime(number) {
	log('Calculating if is prime number', 2, 'other')

	if (number <= 1) {
		return false
	}

	const limit = Math.sqrt(number)

	for (let i = 2; i <= limit; i++) {
		if (number % i === 0) {
			return false
		}
	}

	return true
}

function Counter({ initialCount }) {
	log('<Counter /> rendered', 1)

	const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount])

	const [counterChanges, setCounterChanges] = useState([{ id: 0, value: initialCount }])
	const nextId = useRef(1)

	useEffect(() => {
		setCounterChanges([{ id: 0, value: initialCount }])
		nextId.current = 1
	}, [initialCount])

	const currentCounter = counterChanges.reduce((prevCounter, counterChange) => prevCounter + counterChange.value, 0)

	const handleDecrement = useCallback(function handleDecrement() {
		setCounterChanges(prevPrev => [{ id: nextId.current++, value: -1 }, ...prevPrev])
	}, [])

	const handleIncrement = useCallback(function handleIncrement() {
		setCounterChanges(prevPrev => [{ id: nextId.current++, value: 1 }, ...prevPrev])
	}, [])

	return (
		<section className="counter">
			<p className="counter-info">
				The initial counter value was <strong>{initialCount}</strong>. It{' '}
				<strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
			</p>
			<p>
				<IconButton icon={MinusIcon} onClick={handleDecrement}>
					Decrement
				</IconButton>
				<CounterOutput value={currentCounter} />
				<IconButton icon={PlusIcon} onClick={handleIncrement}>
					Increment
				</IconButton>
			</p>
			<CounterHistory history={counterChanges} />
		</section>
	)
}

export default Counter

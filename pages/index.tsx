import React, { useState } from 'react'

export default function Home() {
  const [interests, setInterests] = useState('')
  const [results, setResults] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/generate-idea', {
      method: 'POST',
      body: JSON.stringify({ interests }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    setResults(data.result)
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <label>
          Twoje zainteresowania
          <input
            name="interests"
            onChange={(e) => setInterests(e.currentTarget.value)}
          />
        </label>
        <button>Wyślij</button>
      </form>
      <p>{results}</p>
    </main>
  )
}

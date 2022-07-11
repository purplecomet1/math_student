import { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {FormControl, InputGroup, Form, Button}  from 'react-bootstrap';

const Home: NextPage = () => {

  const [randomInts, setRandomInts] = useState<[number, number]>([1, 2])
  const [answer, setAnswer] = useState<string>("")
  const [submitText, setSubmitText] = useState<string>("");
      
  useEffect(() => {
    if (submitText == "" || submitText == "Loading...") return

    setTimeout(() => {
      setSubmitText("");
    }, 3000);
  }, [submitText]);     

  useEffect(() => setRandomInts(getIntegers()), []);

  function getIntegers(): [number, number] {
    return [generateInt(), generateInt()]
  }

  function generateInt(): number {
    return Math.floor(Math.random() * 100);
  }

  function handleChange(e: any) {
    console.log(e.nativeEvent?.inputType != "deleteContentBackward")
    if (!/[0-9]/.test(e.nativeEvent?.data) && e.nativeEvent?.inputType != "deleteContentBackward") {
      e.preventDefault();
      return;
    }

    setAnswer(e.target.value);
  }

  async function handleSubmit(e: any) {
    if (submitText !== "") return

    setSubmitText("Loading...")
    const apiRequest = `http://api.mathjs.org/v4/?expr=${num1}%2B${num2}`
    const res = await fetch(apiRequest).catch(err => console.error(err))
    const ans = await res?.json()
    
  
    if (ans == parseInt(answer)) {
      setSubmitText("Correct")
      generateNewQuestion()
    }
    else {
      setSubmitText("Incorrect")
    }
  }

  function handleSkip(e: any) {
    generateNewQuestion()
  }

  function generateNewQuestion() {
    setAnswer("");
    setRandomInts(getIntegers())
  }

  const num1: number = randomInts[0]
  const num2: number = randomInts[1]

  return (
    <div className={styles.container}>
      <Head>
        <title>Math Helper</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Math Helper
        </h1>

        <p className={styles.description}>
          What is {num1} + {num2}?
        </p>

        <div className="mb-3" style={{ height: '20px', opacity : submitText !== "" ? 1 : 0 }}>
          {submitText}
        </div>

        <InputGroup className="mb-3 justify-content-center">
          <input value={answer} onChange={handleChange}/>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          <Button variant="secondary" onClick={handleSkip}>Skip</Button>

        </InputGroup>

      </main>

    </div>
  )
}

export default Home

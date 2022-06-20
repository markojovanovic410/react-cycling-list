import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {RiSearchEyeLine} from 'react-icons/ri';
import { TestData } from './TestData';

const Container = styled('div')`
  background: black;
  width: 600px;
  padding: 50px 40px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px 0px;

  .item {
    color: #888888;
    background: #1C1A1D;
    border-radius: 12px;
    border: 1px solid #888888;
    width: 90%;
    height: 50px;
    padding-left: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .divider {
    height: 3px;
    background-color: #888888;
    width: 100%;
    margin-bottom: 30px;
  }
  .search {
      width: 260px;
      height: 50px;
      background: #1C1A1D;
      border: 1px solid #888888;
      box-sizing: border-box;
      border-radius: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px 20px;
      font-size: 18px;
      line-height: 100%;
      color: #3E3E3E;
      .icon {
          font-size: 22px;
          margin-right: 12px;
      }
      .input {
          width: 100%;
          background: #1C1A1D;
          border: none;
          color: #888888;

          &:focus-visible {
              outline: none;
          } 
      }
  }
  .button {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      background: #FECA00;
      margin-left: 20px;
      padding: 15px 30px;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;

function App() {
  const defaultItems = ['A', 'B', 'C', 'D', 'E'];

  const [content,setContent] = useState(defaultItems);
  const [search, setSearch] = useState('radiohead');
  const [valueContainer, setValueContainer] = useState(defaultItems);

  let loopInteval: NodeJS.Timer;

  const displayContent = () => {
    let temp: string[] = [];
    temp.splice(0,0,...content.slice(1));
    let lastItem: string = valueContainer.shift() + '';
    temp.push(lastItem);
    valueContainer.push(lastItem);

    setContent(temp);
  }

  useEffect(()=>{
    loopInteval = setInterval(displayContent, 1000);

    return ()=>{
      clearInterval(loopInteval);
    }
  }, [displayContent]);

  const onSearch = () => {
    
    /**
     * This is not working. Because in this api, the server doesn't
     * support cross origin request, 
     * The owner of the API has to add 'Access-Control-Allow-Origin' 
     * header to the response with allowed origin (*).
     */
    // let temp = [];
    // fetch('https://itunes.apple.com/search?term='+ search,{
    //   mode:'cors'
    // })
    // .then(response => response.json())
    // .then(data => {
    //   data.results.foreach(elem =>{
    //     temp.push(elem.collectionName)
    //   });
    //   setValueContainer(temp);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    /**
     * This is only need to test
     */
    let temp: string[] = [];
    TestData.results.forEach(element => {
      temp.push(element.collectionName);
    });
    setValueContainer(temp);
  }

  return (
    <Container>
      <div className='header'>
        <div className="search">
          <RiSearchEyeLine className="icon"/>
          <input className="input" placeholder={'Search...'}
              value={search} 
              onChange={e => setSearch(e.target.value)}/>
        </div>
        <span className='button' onClick={() => onSearch()}>
          Search
        </span>
      </div>
      <div className='divider'/>
      {
        content.map((item, index)=>(
          <span className='item' key={index}> {item} </span>
        ))
      }
    </Container>
  );
}

export default App;

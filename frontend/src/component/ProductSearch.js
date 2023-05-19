import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";

const Search = styled.div`
.searchbutton {
    width: 50px;
    height: 20px;
}
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;
const RecmdCard = styled.button`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 360px;
  padding: 0;
  margin: 30px 0 30px;
  align-self: space-evenly;
  /* background: rgb(193, 159, 138); */
  background: white;
  border: 0.5px solid rgb(193, 159, 138);
  /* border: none; */
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
  }
`;
const CardImg = styled.img`
  width: 200px;
  height: 200px;
  border: none;
  outline: none;
  margin-top: 10px;
  border-radius: 10px;
  align-self: center;
`;
const CardTitle = styled.div`
  margin-left: 16px;
`;
const CardDesc = styled.div`
  font-size: 0.9em;
  width: 90%;
  height: 35px;
  align-self: center;
  padding-top: 8px;
  border-top: 0.5px solid rgb(193, 159, 138);
  color: #495057;
`;
const CardTag = styled.div`
  width: 90%;
  color: #495057;
  font-size: 0.9em;
  align-self: center;
`;
const ProductSearch = () => {

    const [inputProductName,setProductName] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const onChangeProductName = (e) => {
        setProductName(e.target.value);
    }
    const search = async() => {
        const rsp = await AxiosApi.searchResultGet(inputProductName);
        if(rsp.status === 200) setSearchResult(rsp.data);
        console.log(rsp.data);
    }

    return(
        <Search>
            <input type="text" value={inputProductName} onChange={onChangeProductName} />
            <button className="searchbutton" onClick={search}>검색</button>
        
            <CardContainer>
          {searchResult.map((e) => (
            <RecmdCard key={e.product_name}>
              <CardImg src={e.product_img} />
              <CardTitle>
                <h4>{e.product_name}</h4>
              </CardTitle>
              <CardDesc>{e.content1}</CardDesc>
              <CardTag>{e.content2}</CardTag>
            </RecmdCard>
          ))}
          </CardContainer>
      </Search>
    );
};
export default ProductSearch;
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context와 카테고리 정의
export const CategoryContext = createContext();

export const category = [
  { key: 'a', label: '일반 고민' },
  { key: 'b', label: '진로/취업' },
  { key: 'c', label: '학교' },
  { key: 'd', label: '직장' },
  { key: 'e', label: '대인 관계' },
  { key: 'f', label: '썸/연애' },
];

export const category2 = [
  { key: 'g', label: '결혼/육아' },
  { key: 'h', label: '이별/이혼' },
  { key: 'i', label: '가족' },
  { key: 'j', label: '성 생활' },
  { key: 'k', label: '외모' },
  { key: 'l', label: '금전' },
  { key: 'm', label: 'LGBT' },
];



export const CategoryProvider = ({ children }) => {
  const [categoryBtn, setCategoryBtn] = useState(category.find(cat => cat.key === 'a'));
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(null);
  const [order, setOrder] = useState(1); 

  // 카테고리 데이터 가져오기
  const getCategoryData = async (categoryKey, order) => {
    try {
      const response = await axios.get(`http://52.78.131.56:8080/general/postall/${categoryKey}/${order}`);
      if (response.data && response.data.length > 0) {
        setData(response.data);
        setNoData(null);
      } else {
        setData([]);
        setNoData('비어있음');
      }
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };

  // 카테고리 클릭 처리
  const ClickCategory = (category) => {
    setCategoryBtn(category);
    getCategoryData(category.key, order);
  };

  // Order 변경 처리
  const clickOrder = (event) => {
    const selectedValue = event.target.value;
    setOrder(selectedValue);
  };
  

  const [selectedCategory, setSelectedCategory] = useState('a');

  // 카테고리 선택 처리
  const handleCategory = (e) => {
    const selectedValue = e.target.value;
    const selectedCategoryObj = [...category, ...category2].find(cat => cat.key === selectedValue);

    if (selectedCategoryObj) {
      setSelectedCategory(selectedCategoryObj.key);
      ClickCategory(selectedCategoryObj);
    } else {
      console.error('카테고리 키를 찾을 수 없습니다.');
    }
  };

  useEffect(() => {
    if (categoryBtn) {
      getCategoryData(categoryBtn.key, order);
    }
  }, [categoryBtn, order]);

  return (
    <CategoryContext.Provider value={{ categoryBtn, data, ClickCategory, handleCategory, selectedCategory,  clickOrder , order}}>
      {children}
    </CategoryContext.Provider>
  );
};

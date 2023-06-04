import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Styled from './styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'styled-bootstrap-grid';

import { PaginationBtn } from '../../pages/ProfilePage/styled';

const BonusHistory = ({ userId, setActiveTab }) => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();
   const [bonuses, setBonuses] = useState([]);
   const [counts, setCounts] = useState([]);

   const [userBonusCount, setUserBonusCount] = useState(4);
   const [bonusPagination, setBonusPagination] = useState(false);


   useEffect(() => {
      if (userId) {
         GetUserBonusHistory();
      }
   }, [userId])

   useEffect(() => {
      if (bonuses.length) {
         let bonusCount = [];
         let count = 0;
         bonuses.reverse().map((bonus) => {
            count = bonus.operation_type === 1 ? count - Number(bonus.amount) : count + Number(bonus.amount);
            bonusCount.push(count);
         });
         bonuses.reverse();

         bonusCount = bonusCount.reverse();
         setCounts(bonusCount);
      }
   }, [bonuses])

   const GetUserBonusHistory = async () => {
      try {
         const response = await axios.get('http://localhost:3001/getUserBonusHistory', {
            params: {
               userId: userId,
            }
         },
            { withCredentials: true }
         );

         if (response.data.length > 4 && userBonusCount < response.data.length) setBonusPagination(true);
         setBonuses(response.data);

      } catch (error) {
         if (error.response) {
            console.log(error.response.data);
         }
      }
   }

   const showMoreBonus = () => {
      setUserBonusCount(userBonusCount + 4);
      if (bonuses.length <= userBonusCount + 4) setBonusPagination(false);
   }

   const ExitEditMode = () => {
      searchParams.set('filter', 'tickets')
      setSearchParams(searchParams);
      setActiveTab('tickets');
   }

   return (
      <>
         <Row>
            <Col col="12">
               <Styled.SectionTitleDiv>
                  <Styled.SectionTitle>История накопления бонусов</Styled.SectionTitle>
                  <Styled.ExitIcon onClick={ExitEditMode}>×</Styled.ExitIcon>
               </Styled.SectionTitleDiv>
            </Col>
         </Row >
         {(bonuses && bonuses.length > 0 && counts.length > 0) &&
            <>
               {bonuses.map((bonus, index) => {
                  let dateTime = new Date(bonus.date_time).toISOString().split('T');
                  let date = dateTime[0].split('-');
                  let time = dateTime[1].split(':');
                  return index < userBonusCount ? <Row key={index}>
                     <Col xl="9" md="12" sm="12" xs="12">
                        <Styled.BonusHistoryCard key={index}>
                           {bonus.order_number && <Styled.OrderNumber>№ заказа: {bonus.order_number}</Styled.OrderNumber>}
                           <Styled.BonusInfoDiv>
                              {bonus.film_title && <Styled.FilmTitle>{bonus.film_title}</Styled.FilmTitle>}
                              {!bonus.film_title && <Styled.FilmTitle style={{ opacity: 0.5 }}>Данные сеанса удалены</Styled.FilmTitle>}
                              <Styled.InfoDiv style={{ maxWidth: '140px' }}>
                                 {bonus.operation_type === 1 ? 'Списание: ' : 'Начисление: '} <span style={{ color: ' #8D1BCD', fontWeight: '500' }}>{bonus.amount}</span>
                              </Styled.InfoDiv>
                              <Styled.InfoDiv style={{ maxWidth: '140px' }}>
                                 Баланс: <span style={{ color: ' #2D2B35', fontWeight: '500' }}>{counts[index]}</span>
                              </Styled.InfoDiv>
                              <Styled.InfoDiv>
                                 Дата/время: {date[2]}.{date[1]}.{date[0]} {time[0]}:{time[1]}
                              </Styled.InfoDiv>
                           </Styled.BonusInfoDiv>
                        </Styled.BonusHistoryCard>
                     </Col>
                  </Row > : true;
               })}
               {(bonuses.length > 4 && bonusPagination) &&
                  <Row justifyContent='center'>
                     <PaginationBtn onClick={showMoreBonus}> Показать больше</PaginationBtn>
                  </Row>
               }
            </>
         }
         {
            (!bonuses || !bonuses.length > 0) &&
            <Row>
               <Styled.NoResults>
                  Ваша история накопления пока пуста
               </Styled.NoResults>
            </Row>
         }
      </>
   );
}

export default BonusHistory;
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav``;

export const FullMenu = styled.div`
   display: none;
   @media (min-width: 992px) {
      display: block;
   }
`;

export const SrcBlock = styled.div`
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
   vertical-align: middle;
   gap: 32px;
   height: 90px;

`;

export const LogoSrcBlock = styled(SrcBlock)`
   justify-content: center;   
`;

export const LastSrcBlock = styled(SrcBlock)`
   -webkit-box-pack: end;
   -ms-flex-pack: end;
   justify-content: flex-end;
`;

export const Src = styled(Link)`
   position: relative;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   height: 30px;
   margin-top: 6px;

   color: #FFFFFF;
   text-decoration: none;
   display: inline-block;

   &::after {
      position: absolute;
      content: "";
      display: block;
      opacity: 0;
      width: 8px;
      height: 8px;

      background: #8D1BCD;
      border-radius: 2px;
      left: 48%;
      margin-top: 2px;
   }

   &:hover::after{
      opacity: 1;
      transition: all 0.25s;
   }
`;

export const SrcLogo = styled(Link)`
   color: #FFFFFF;
   text-decoration: none;
   display: block;

   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 24px;
   line-height: 24px;

   transition: all 0.25s;

   &:hover{
      color: #8D1BCD;
   }
`;
export const SrcAccount = styled(Link)`
   color: #FFFFFF;
   text-decoration: none;
   display: block;
   text-align: center;
   line-height: 40px;
   padding: 0 15px;

   width: 160px;
   height: 40px;

   border: 1px solid #FFFFFF;
   border-radius: 8px;

   transition: all 0.25s;

   &:hover{
      border-color: #8D1BCD;
      background-color: #8D1BCD;
   }
`;
export const SrcSearch = styled(Link)`
   color: #FFFFFF;
   text-decoration: none;
   display: block;
`;

export const SearchImg = styled.img``;


export const MobileMenu = styled.div`
   display: none;
   width: 100%;
   position: fixed;
   -webkit-box-align: center;
         -ms-flex-align: center;
            align-items: center;
   -webkit-box-pack: justify;
         -ms-flex-pack: justify;
            justify-content: space-between;
   padding: 0 30px;
   top: 0;
   left: 0;
   right: 0;
   height: 70px;
   z-index: 9999999;
   background-color: #2D2B35;

   @media (max-width: 992px) {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
   }
   @media (max-width: 576px) {
      padding: 0 16px;
   }
`;

export const MobileMenuBtn = styled.label`
   position: relative;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
         -ms-flex-align: center;
            align-items: center;
   -webkit-box-pack: center;
         -ms-flex-pack: center;
            justify-content: center;
   width: 35px;
   height: 45px;
   cursor: pointer;
   -webkit-transition: 0.4s;
   transition: 0.4s;
   line-height: 45px;
`;
export const MobileMenuIcon = styled.div`
   display: block;
   position: relative;
   background: #FFFFFF;
   width: 90%;
   height: 2px;
   -webkit-transition: 0.4s;
   transition: 0.4s;
   overflow: visible;
   
   &::after, &::before{
      content: "";
      display: block;
      position: absolute;
      background: #FFFFFF;
      color: #FFFFFF;
      width: 100%;
      height: 2px;
      -webkit-transition: 0.4s;
      transition: 0.4s;
   }

   &::after{
      top: 8px;
   }

   &::before{
      top: -8px;
   }
`;

export const MobileMenuContainer = styled.div`
   position: fixed;
   text-align: center;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
         -ms-flex-align: center;
            align-items: center;
   -webkit-box-pack: center;
         -ms-flex-pack: center;
            justify-content: center;
   top: 70px;
   left: 0;
   right: 0;
   z-index: 999;
   height: 0;
   opacity: 1;
   -webkit-transition: 0.5s;
   transition: 0.5s;
   -webkit-transition-delay: 0.2s;
            transition-delay: 0.2s;
   overflow: hidden;
   background-color: #2D2B35;
`;

export const MobileMenuList = styled.ul`
   -webkit-transition: 0.5s;
   transition: 0.5s;
   -webkit-transition-delay: 0.5s;
            transition-delay: 0.5s;
   list-style: none;
   padding-left: 0;
   margin-top: -50px;
`;

export const MobileMenuItem = styled.li`
   font-size: 18px;
   padding-bottom: 32px;
`;

export const MobileMenuLink = styled(Link)`
   text-decoration: none;
   color: #FFFFFF;
`;

export const MobileMenuCheckbox = styled.input`
   display: none;

   &:checked ~ ${MobileMenuContainer}{
      height: 100%;
      -webkit-transition-delay: 0s;
               transition-delay: 0s;
      background-color: #2D2B35;
   }
   
   &:checked ~ ${MobileMenuBtn} ${MobileMenuIcon} {
      background-color: #2D2B35;
   }

   &:checked ~ ${MobileMenuBtn} ${MobileMenuIcon}::before, &:checked ~ ${MobileMenuIcon}::after {
      top: 0;
   }

   &:checked ~ ${MobileMenuBtn} ${MobileMenuIcon}::after {
      transform: rotate(-45deg) translateX(5px);
      -webkit-transform: rotate(-45deg) translateX(5px);
   }

   &:checked ~ ${MobileMenuBtn} ${MobileMenuIcon}::before {
      transform: rotate(45deg) translateX(6px);
      -webkit-transform: rotate(45deg) translateX(6px);
   }
`;

export const MobileSrcLogo = styled(SrcLogo)`
   color: #FFFFFF;
   text-decoration: none;
   display: block;

   font-family: 'Azonix';
   font-style: normal;
   font-weight: 400;
   font-size: 18px;
   line-height: 48px;

`;



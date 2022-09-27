<template>
  <div class="main-header">
    <div class="main-header__names">
      <div class="main-header__names--bride-name">
        {{bride}}
      </div>
        <span>&</span>
      <div class="main-header__names--groom-name">
        {{groom}}
      </div>
    </div>
    
    <!-- <div class="main-header__title">
      <span>{{ mainTitle }}</span>
    </div> -->
    <div class="main-header__subtitle">
      <ul>
        <li>{{ hashtag_1 }}</li>
        <li>{{ hashtag_2 }}</li>
        <li>{{ hashtag_1 }}</li>
        <!-- <li>{{ hashtag_1 }}</li> -->

      </ul>
      <!-- <span>{{ subTitle }}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      mainTitle: "Yamini & Dhruv",
      bride:"Yamini",
      groom:"Dhruv",
      hashtag_1: "#GuptaFoundGupta",
      hashtag_2:"#YaminiKaDhruvTara",
      backgroundImage: "/src/assets/bg-desktop.jpg",
    };
  },
};
</script>

<style lang="less">

  

  @keyframes movebottom {
    from {top: -90px;}
    to {top:0;}
  }

  @keyframes widthReduction {
    from {width: 100%;}
    to { width :30%;}
    
  }

   @keyframes widthReductionMobile {
    from {width: 100%;}
    to { width : 70%;}
    
  }

  @keyframes appear {
    from {opacity:0;}
    to {opacity:1;}
  }


@keyframes 
	scrollUp {
		50% { transform: translateY(-30%);
    }
    100% {
      transform: translateY(-70%);
    }
  }


.main-header {
  padding-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
  top:0;
  left: 35%;
  animation-name: movebottom;
  animation-duration: 2s;

  @media (max-width:480px) {
    margin-bottom: 45%;
  }


  &__names {
    align-self: center;
    padding: 0vh 1vh;
    color: orange;
    font-size: 5vh;
    border-radius: 15px;
    display: flex;
    width: 100%;
    animation: appear 4s 1s forwards, widthReduction 4s 2s forwards;
    opacity: 0;

    @media (max-width:480px) {
      font-size: 2rem;
      animation: appear 4s 1s forwards, widthReductionMobile 4s 2s forwards;
  }

    span {
      animation: appear 4s forwards;
      font-family: Milkshake;
    }

    &--groom-name{
      width: 50%;
    }

    &--bride-name {
      width: 60%;
    }

  }

  &__subtitle {

    @media (min-width: 769px){
      position: absolute;
      bottom: 10px;
      backdrop-filter: blur(2px);

    }

    align-self: center;
    // padding: 0vh 1vh;
    border-radius: 15px;
    color: beige;
    height: 3rem;
    margin: 1rem 0;
    overflow: hidden;
    opacity: 0;
    animation: appear 4s 3s forwards; 

    ul {
      margin: 0 0.625rem;
      padding: 0;
      animation: scrollUp 4s infinite;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        list-style: none; 
      }
    }
  }
}



</style>

import * as stylex from '@stylexjs/stylex'

export function Stars() {
  return (
    <div aria-hidden='true' {...stylex.props(styles.layer)}>
      {starStyles.map((starStyle, index) => (
        <span key={index} {...stylex.props(styles.star, starStyle)} />
      ))}
    </div>
  )
}

//* Styles *//

const starDrift = stylex.keyframes({
  '0%, 100%': {
    transform: 'translate3d(0, 0, 0)',
    opacity: 0.55,
  },
  '50%': {
    transform: 'translate3d(3px, -9px, 0)',
    opacity: 1,
  },
})

const styles = stylex.create({
  layer: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    insetInline: 0,
    height: '320px',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  star: {
    position: 'absolute',
    display: 'block',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow:
      '0 0 7px 2px rgba(255, 255, 255, 0.8), 0 0 15px 3px rgba(251, 191, 36, 0.55)',
    animationName: starDrift,
    animationDuration: {
      default: '5.5s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  starOne: {
    top: '34px',
    left: '9%',
    width: '3px',
    height: '3px',
    animationDelay: '-1.2s',
  },
  starTwo: {
    top: '76px',
    left: '22%',
    width: '5px',
    height: '5px',
    animationDelay: '-3.6s',
  },
  starThree: {
    top: '24px',
    left: '38%',
    width: '4px',
    height: '4px',
    animationDelay: '-2s',
  },
  starFour: {
    top: '112px',
    left: '53%',
    width: '3px',
    height: '3px',
    animationDelay: '-4.4s',
  },
  starFive: {
    top: '48px',
    left: '67%',
    width: '5px',
    height: '5px',
    animationDelay: '-0.8s',
  },
  starSix: {
    top: '132px',
    left: '79%',
    width: '4px',
    height: '4px',
    animationDelay: '-2.8s',
  },
  starSeven: {
    top: '28px',
    left: '91%',
    width: '3px',
    height: '3px',
    animationDelay: '-4.8s',
  },
  starEight: {
    top: '184px',
    left: '31%',
    width: '3px',
    height: '3px',
    animationDelay: '-1.8s',
  },
  starNine: {
    top: '58px',
    left: '15%',
    width: '2px',
    height: '2px',
    animationDelay: '-2.5s',
    animationDuration: {
      default: '6.8s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTen: {
    top: '146px',
    left: '5%',
    width: '4px',
    height: '4px',
    animationDelay: '-5.2s',
    animationDuration: {
      default: '7.4s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starEleven: {
    top: '206px',
    left: '18%',
    width: '3px',
    height: '3px',
    animationDelay: '-3.1s',
    animationDuration: {
      default: '5.9s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwelve: {
    top: '92px',
    left: '29%',
    width: '2px',
    height: '2px',
    animationDelay: '-0.6s',
    animationDuration: {
      default: '8.2s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starThirteen: {
    top: '168px',
    left: '43%',
    width: '5px',
    height: '5px',
    animationDelay: '-4.1s',
    animationDuration: {
      default: '6.3s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starFourteen: {
    top: '54px',
    left: '48%',
    width: '3px',
    height: '3px',
    animationDelay: '-1.5s',
    animationDuration: {
      default: '7.8s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starFifteen: {
    top: '226px',
    left: '61%',
    width: '2px',
    height: '2px',
    animationDelay: '-3.8s',
    animationDuration: {
      default: '5.2s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starSixteen: {
    top: '102px',
    left: '73%',
    width: '4px',
    height: '4px',
    animationDelay: '-2.2s',
    animationDuration: {
      default: '8.5s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starSeventeen: {
    top: '194px',
    left: '87%',
    width: '3px',
    height: '3px',
    animationDelay: '-5.4s',
    animationDuration: {
      default: '6.6s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starEighteen: {
    top: '82px',
    left: '96%',
    width: '2px',
    height: '2px',
    animationDelay: '-1s',
    animationDuration: {
      default: '7.1s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starNineteen: {
    top: '244px',
    left: '11%',
    width: '4px',
    height: '4px',
    animationDelay: '-2.7s',
    animationDuration: {
      default: '6.2s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwenty: {
    top: '126px',
    left: '36%',
    width: '3px',
    height: '3px',
    animationDelay: '-4.6s',
    animationDuration: {
      default: '7.6s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyOne: {
    top: '270px',
    left: '47%',
    width: '2px',
    height: '2px',
    animationDelay: '-1.1s',
    animationDuration: {
      default: '5.7s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyTwo: {
    top: '218px',
    left: '72%',
    width: '3px',
    height: '3px',
    animationDelay: '-3.3s',
    animationDuration: {
      default: '8.1s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyThree: {
    top: '156px',
    left: '94%',
    width: '4px',
    height: '4px',
    animationDelay: '-5.7s',
    animationDuration: {
      default: '6.4s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyFour: {
    top: '18px',
    left: '58%',
    width: '2px',
    height: '2px',
    animationDelay: '-2.3s',
    animationDuration: {
      default: '7.3s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyFive: {
    top: '286px',
    left: '25%',
    width: '3px',
    height: '3px',
    animationDelay: '-4.9s',
    animationDuration: {
      default: '5.4s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentySix: {
    top: '238px',
    left: '83%',
    width: '2px',
    height: '2px',
    animationDelay: '-0.9s',
    animationDuration: {
      default: '8.4s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentySeven: {
    top: '16px',
    left: '3%',
    width: '3px',
    height: '3px',
    animationDelay: '-3.9s',
    animationDuration: {
      default: '6.9s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyEight: {
    top: '120px',
    left: '63%',
    width: '2px',
    height: '2px',
    animationDelay: '-1.7s',
    animationDuration: {
      default: '7.9s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starTwentyNine: {
    top: '296px',
    left: '56%',
    width: '4px',
    height: '4px',
    animationDelay: '-5.1s',
    animationDuration: {
      default: '5.8s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
  starThirty: {
    top: '178px',
    left: '6%',
    width: '2px',
    height: '2px',
    animationDelay: '-2.9s',
    animationDuration: {
      default: '8.7s',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
  },
})

const starStyles = [
  styles.starOne,
  styles.starTwo,
  styles.starThree,
  styles.starFour,
  styles.starFive,
  styles.starSix,
  styles.starSeven,
  styles.starEight,
  styles.starNine,
  styles.starTen,
  styles.starEleven,
  styles.starTwelve,
  styles.starThirteen,
  styles.starFourteen,
  styles.starFifteen,
  styles.starSixteen,
  styles.starSeventeen,
  styles.starEighteen,
  styles.starNineteen,
  styles.starTwenty,
  styles.starTwentyOne,
  styles.starTwentyTwo,
  styles.starTwentyThree,
  styles.starTwentyFour,
  styles.starTwentyFive,
  styles.starTwentySix,
  styles.starTwentySeven,
  styles.starTwentyEight,
  styles.starTwentyNine,
  styles.starThirty,
]
import React from "react"

interface Props {
  children: React.ReactNode
}

function LoadingFetching({ children }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative w-[120px] h-[90px]">
        {/* Bouncing ball */}
        <div className="absolute bottom-[30px] left-[50px] w-[30px] h-[30px] rounded-full bg-teal-600 dark:bg-teal-500 animate-bounce-loading" />

        {/* Steps */}
        <div
          className="absolute right-0 top-0 h-[7px] w-[45px] rounded animate-step-loading
                        shadow-[0_5px_0_#d4d4d8,_-35px_50px_0_#d4d4d8,_-70px_95px_0_#d4d4d8]
                        dark:shadow-[0_5px_0_#52525b,_-35px_50px_0_#52525b,_-70px_95px_0_#52525b]"
        />
      </div>

      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center text-xl italic text-zinc-700 dark:text-zinc-300">
        {children}
      </div>

      <style jsx>{`
        @keyframes bounce-loading {
          0% {
            transform: scale(1, 0.7);
          }
          40% {
            transform: scale(0.8, 1.2);
          }
          60% {
            transform: scale(1, 1);
          }
          100% {
            bottom: 140px;
          }
        }

        @keyframes step-loading {
          0% {
            box-shadow: 0 10px 0 rgba(0, 0, 0, 0), 0 10px 0 currentColor,
              -35px 50px 0 currentColor, -70px 90px 0 currentColor;
          }
          100% {
            box-shadow: 0 10px 0 currentColor, -35px 50px 0 currentColor,
              -70px 90px 0 currentColor, -70px 90px 0 rgba(0, 0, 0, 0);
          }
        }

        .animate-bounce-loading {
          animation: bounce-loading 0.5s ease-in-out infinite alternate;
        }

        .animate-step-loading {
          animation: step-loading 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default LoadingFetching

import React from "react"
import "./loadingData.css"
interface Props {
  children: React.ReactNode
}
function LoadingFetching({ children }: Props) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="text-loading">{children}</div>
    </div>
  )
}

export default LoadingFetching

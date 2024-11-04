import "./ExploreShimmer.scss"

const ExploreShimmer = () => {
  return (
    <div className='explore-shimmer'>
        {Array.from({ length: 15 }, (_, index) => (
            <div className="shimmer" key={index}></div>
        ))}
    </div>
  )
}

export default ExploreShimmer;

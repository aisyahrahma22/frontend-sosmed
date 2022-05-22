import React from 'react'
import '../Supports/Stylesheets/HomePage.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

class LoadingSkeleton extends React.Component{
    render(){
        return(
            <SkeletonTheme baseColor="grey" highlightColor="darkgrey">
            <>
                <div className='container mb-5 pb-3'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-4 my-2'>
                                <div className="card product-card">
                                    <div className='tittle mb-2'>
                                        <div className='d-flex'>
                                            <Skeleton  width={30} height={30} duration={1} />
                                            <span className='mx-3' style={{fontFamily: "Source Sans Pro"}}>  <Skeleton  width={255} height={30} duration={1} /></span>
                                        </div>    
                                    </div>
                                    <Skeleton  width={300} height={200} duration={1} />
                                    <div className="mt-2">
                                <div className='d-flex flex-column'>
                                    <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}> <Skeleton  width={180} height={20} duration={1} /></span>
                                    <div id="interaction">
                                    <Skeleton  width={20} height={20} duration={1} />
                                    <span className='mx-3' style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                                    <Skeleton  width={100} height={20} duration={1} />
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4 my-2'>
                                <div className="card product-card">
                                    <div className='tittle mb-2'>
                                        <div className='d-flex'>
                                            <Skeleton  width={30} height={30} duration={1} />
                                            <span className='mx-3' style={{fontFamily: "Source Sans Pro"}}>  <Skeleton  width={255} height={30} duration={1} /></span>
                                        </div>    
                                    </div>
                                    <Skeleton  width={300} height={200} duration={1} />
                                    <div className="mt-2">
                                <div className='d-flex flex-column'>
                                    <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}> <Skeleton  width={180} height={20} duration={1} /></span>
                                    <div id="interaction">
                                    <Skeleton  width={20} height={20} duration={1} />
                                    <span className='mx-3' style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                                    <Skeleton  width={100} height={20} duration={1} />
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-4 my-2'>
                                <div className="card product-card">
                                    <div className='tittle mb-2'>
                                        <div className='d-flex'>
                                            <Skeleton  width={30} height={30} duration={1} />
                                            <span className='mx-3' style={{fontFamily: "Source Sans Pro"}}>  <Skeleton  width={255} height={30} duration={1} /></span>
                                        </div>    
                                    </div>
                                    <Skeleton  width={300} height={200} duration={1} />
                                    <div className="mt-2">
                                <div className='d-flex flex-column'>
                                    <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}> <Skeleton  width={180} height={20} duration={1} /></span>
                                    <div id="interaction">
                                    <Skeleton  width={20} height={20} duration={1} />
                                    <span className='mx-3' style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                                    <Skeleton  width={100} height={20} duration={1} />
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>

                </div>
            </>
            
            </SkeletonTheme>
        )
    }
}

export default LoadingSkeleton
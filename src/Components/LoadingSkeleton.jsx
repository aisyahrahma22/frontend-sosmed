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
             {/* <div className='col-lg-4 col-md-6 col-12'>
             <div className='col-4'>

                    <div className="row card rounded-0 mx-1 px-3 py-3" style={{width: '18rem', position: 'absolute'}}>
                        
                        
                        
                            <Skeleton  width={250} height={230} duration={1} />
                        
                        <div className="row justify-content-center">
                            <Skeleton  width={150} height={30} duration={1} style={{position: 'relative', bottom: '50px', width: '100px', opacity: 0.9}} />
                        </div>
                        
                        
                        <div className='row mt-2'>
                           
                        </div>
                        
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                               
                            </div>
                            <h6 className="card-title mt-n2">
                                <Skeleton  width={50} height={20} duration={1} />
                            </h6>
                           
                            <p className="card-text">
                                <Skeleton  width={220} height={90} duration={1} />
                            </p>
                            <Skeleton  width={220} height={30} duration={1} />
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                   
                    <div className="row card rounded-0 mx-1 px-3 py-3" style={{width: '18rem', position: 'absolute'}}>
                        
                     
                        
                            <Skeleton  width={250} height={230} duration={1} />
                        
                        <div className="row justify-content-center">
                            <Skeleton  width={150} height={30} duration={1} style={{position: 'relative', bottom: '50px', width: '100px', opacity: 0.9}} />
                        </div>
                        
                        
                        <div className='row mt-2'>
                           
                        </div>
                        
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                              
                            </div>
                            <h6 className="card-title mt-n2">
                                <Skeleton  width={50} height={20} duration={1} />
                            </h6>
                            <p className="card-text">
                                <Skeleton  width={220} height={90} duration={1} />
                            </p>
                            <Skeleton  width={220} height={30} duration={1} />
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                 
                    <div className="row card rounded-0 mx-1 px-3 py-3" style={{width: '18rem', position: 'absolute'}}>
                        
                     
                        
                            <Skeleton  width={250} height={230} duration={1} />
                        
                        <div className="row justify-content-center">
                            <Skeleton  width={150} height={30} duration={1} style={{position: 'relative', bottom: '50px', width: '100px', opacity: 0.9}} />
                        </div>
                        
                        
                        <div className='row mt-2'>
                          
                        </div>
                        
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                              
                            </div>
                            <h6 className="card-title mt-n2">
                                <Skeleton  width={50} height={20} duration={1} />
                            </h6>
                           
                            <p className="card-text">
                                <Skeleton  width={220} height={90} duration={1} />
                            </p>
                            <Skeleton  width={220} height={30} duration={1} />
                        </div>
                    </div>
                </div>
             </div> */}
            </SkeletonTheme>
        )
    }
}

export default LoadingSkeleton
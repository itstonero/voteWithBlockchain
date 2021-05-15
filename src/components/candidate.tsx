import React from 'react';
import Loader from "react-loader-spinner";

export function Loading({ loading}:any){
    return <Loader  type="Circles" color="#00BFFF" height={400} width={400} visible={ loading } />
}
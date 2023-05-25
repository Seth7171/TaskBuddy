import { useState, useEffect } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null); // will fetch later
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();


        setTimeout(() => {
            //console.log('use effect ran');
            //console.log(data);
            // fetch time!
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    //console.log(res);
                    if(!res.ok){
                        throw Error('could not fetch the data for that reource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data)
                    setisPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError'){
                        console.log('fetch aborted');
                    } else {
                        console.log(err.message);
                        setError(err.message);
                        setisPending(false);
                    }
                })
        }, 1000); // timer to fake the loading time
        return () => abortCont.abort();
    }, [url]);  // if Iwe enter [handleDelete, name] handleDelete will activcate this function useEffect every render
                                // also will activate when name is changed

    return { data, isPending, error }
}
export default useFetch;
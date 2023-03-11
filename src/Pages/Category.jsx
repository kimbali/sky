import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');

        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        let listings = [];

        querySnap.forEach((doc) =>
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        );

        setListings(listings);
        setLoading(false);
      } catch (err) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, [params.categoryName]);

  const showMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings');

      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      let listings = [];

      querySnap.forEach((doc) =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      setListings((prevListings) => [...prevListings, ...listings]);
      setLoading(false);
    } catch (err) {
      toast.error('Could not fetch listings');
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">{params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>

          {lastFetchedListing && (
            <p className="loadMore" onClick={showMoreListings}>
              Show more listings
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

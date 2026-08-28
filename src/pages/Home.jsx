import SOSButton from "../components/SOSButton";
import { useState } from "react";

import {
  AlertTriangle,
  ChevronRight,
  FileText,
  Map,
  Shield,
  Siren,
  UserRound,
  MapPin,
  Navigation,
  X,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // SOS states
  const [sosActive, setSosActive] = useState(false);
  const [sosConfirmationOpen, setSosConfirmationOpen] = useState(false);
  const [sosConfirmed, setSosConfirmed] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  // ==================================================
  // ACTIVATE SOS
  // ==================================================

  const handleSOS = () => {
    setSosConfirmationOpen(true);
  };

  const sendSOS = () => {
    setSosConfirmationOpen(false);
    setSosActive(true);
    setSosConfirmed(true);
    setSosSuccess(false);
    setLocation(null);
    setLocationError("");
    setLocationLoading(true);

    if (!navigator.geolocation) {
      setLocationLoading(false);

      setLocationError(
        "Location services are not supported by this browser."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sosData = {
          type: "SOS",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          createdAt: new Date().toISOString(),
        };

        setLocation({
          ...sosData,
          accuracy: position.coords.accuracy,
        });
        setLocationLoading(false);
        setSosSuccess(true);

        console.log("SOS Emergency:", sosData);
      },

      (error) => {
        console.error("GPS Error:", error);

        setLocationLoading(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Your location could not be determined."
          );
        } else if (error.code === 3) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to get your current location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ==================================================
  // CLOSE SOS
  // ==================================================

  const closeSOS = () => {
    setSosActive(false);
    setSosConfirmationOpen(false);
    setSosConfirmed(false);
    setSosSuccess(false);
    setLocation(null);
    setLocationError("");
    setLocationLoading(false);
  };

  // ==================================================
  // OPEN LOCATION IN GOOGLE MAPS
  // ==================================================

  const openLocationOnMap = () => {
    if (!location) return;

    const { latitude, longitude } = location;

    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">

              <Shield size={23} />

            </div>

            <div>

              <h1 className="text-xl font-black text-slate-900">
                CampusSafe
              </h1>

              <p className="text-xs text-slate-500">
                Smart Campus Emergency Response
              </p>

            </div>

          </div>


          {/* PROFILE */}

          <button
            onClick={() => navigate("/reports")}
            title="My Reports"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white transition hover:bg-slate-700"
          >

            <UserRound size={18} />

          </button>

        </div>

      </header>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="mx-auto max-w-6xl px-6 py-8">


        {/* ==================================================
            HERO
        ================================================== */}

        <section className="overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-lg">

          <div className="max-w-2xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500">

              <Shield size={25} />

            </div>


            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
              Smart Campus Safety
            </p>


            <h2 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">

              Your campus.
              <br />

              Your safety.
              <br />

              One tap away.

            </h2>


            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">

              Report emergencies, get help quickly, track incidents,
              and stay informed about campus safety.

            </p>


            {/* ==================================================
                SOS BUTTON
            ================================================== */}

            <button
              onClick={handleSOS}
              className="mt-7 flex w-full animate-pulse items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:animate-none hover:bg-red-700 hover:shadow-xl sm:w-auto"
            >

              <Siren size={24} />

              SOS — Emergency

            </button>

          </div>

        </section>

        <SOSButton />


        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-xl font-black text-slate-900">
              Quick Actions
            </h2>

            <p className="text-sm text-slate-500">
              Access important safety features quickly.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2">


            {/* ==================================================
                REPORT EMERGENCY
            ================================================== */}

            <button
              onClick={() => navigate("/report")}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">

                  <AlertTriangle size={24} />

                </div>

                <ChevronRight
                  size={20}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-red-500"
                />

              </div>


              <h3 className="mt-5 text-lg font-black text-slate-900">
                Report Emergency
              </h3>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                Report an emergency or safety incident with location
                and supporting evidence.

              </p>

            </button>


            {/* ==================================================
                MY REPORTS
            ================================================== */}

            <button
              onClick={() => navigate("/reports")}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                  <FileText size={24} />

                </div>


                <ChevronRight
                  size={20}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
                />

              </div>


              <h3 className="mt-5 text-lg font-black text-slate-900">
                My Reports
              </h3>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                Track submitted incidents and monitor their response
                status.

              </p>

            </button>


            {/* ==================================================
                SAFETY MAP
            ================================================== */}

            <button
              onClick={() => navigate("/map")}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                  <Map size={24} />

                </div>


                <ChevronRight
                  size={20}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500"
                />

              </div>


              <h3 className="mt-5 text-lg font-black text-slate-900">
                Safety Map
              </h3>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                View incidents, risk zones, and campus security
                locations.

              </p>

            </button>


            {/* ==================================================
                EMERGENCY PREPAREDNESS
            ================================================== */}

            <button
              onClick={() => navigate("/preparedness")}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">

                  <Shield size={24} />

                </div>


                <ChevronRight
                  size={20}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-500"
                />

              </div>


              <h3 className="mt-5 text-lg font-black text-slate-900">
                Emergency Preparedness
              </h3>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                Emergency contacts, evacuation instructions,
                assembly points, and safety procedures.

              </p>

            </button>

          </div>

        </section>


        {/* ==================================================
            CAMPUS STATUS
        ================================================== */}

        <section className="mt-8 grid gap-5 sm:grid-cols-3">


          {/* CAMPUS STATUS */}

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

            <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
              Campus Status
            </p>

            <p className="mt-2 text-2xl font-black text-emerald-800">
              Protected
            </p>

            <p className="mt-1 text-sm text-emerald-700">
              Safety systems operational
            </p>

          </div>


          {/* ACTIVE INCIDENTS */}

          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Active Incidents
            </p>

            <p className="mt-2 text-2xl font-black text-slate-900">
              02
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Being monitored
            </p>

          </div>


          {/* SECURITY TEAMS */}

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Security Teams
            </p>

            <p className="mt-2 text-2xl font-black text-slate-900">
              04
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Available on campus
            </p>

          </div>

        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="py-10 text-center">

          <p className="text-sm font-bold text-slate-700">
            CampusSafe
          </p>

          <p className="mt-1 text-xs text-slate-400">

            Smart Campus Emergency Response & Safety Management System

          </p>

        </footer>

      </main>


      {/* ==================================================
          SOS LOCATION POPUP
      ================================================== */}

      {(sosConfirmationOpen || sosActive) && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">


            {/* CLOSE X */}

            <div className="flex justify-end">

              <button
                onClick={closeSOS}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close"
              >

                <X size={20} />

              </button>

            </div>


            {/* SOS ICON */}

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">

                <Siren size={32} />

              </div>


              <h2 className="mt-5 text-2xl font-black text-slate-900">
                {sosConfirmationOpen
                  ? "Send Emergency SOS?"
                  : "Emergency SOS Activated"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {sosConfirmationOpen
                  ? "Are you sure you want to send an emergency SOS?"
                  : "Your emergency request has been activated."}
              </p>


            {sosConfirmationOpen && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={closeSOS}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={sendSOS}
                  className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Send SOS
                </button>
              </div>
            )}
            </div>


            {/* ==================================================
                GETTING LOCATION
            ================================================== */}
            {sosConfirmed && locationLoading && (

              <div className="mt-6 rounded-2xl bg-blue-50 p-6 text-center">

                <div className="mx-auto flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-blue-100 text-blue-600">

                  <Navigation size={24} />

                </div>


                <p className="mt-3 font-black text-blue-900">

                  Getting your location...

                </p>


                <p className="mt-1 text-xs text-blue-700">

                  Please allow location access in your browser.

                </p>

              </div>

            )}


            {/* ==================================================
                LOCATION SUCCESS
            ================================================== */}

            {sosConfirmed && location && !locationLoading && (

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">


                {/* LOCATION HEADER */}

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                    <MapPin size={23} />

                  </div>


                  <div>

                    <h3 className="font-black text-slate-900">

                      Current Location

                    </h3>


                    <p className="text-xs text-slate-500">

                      GPS location captured successfully

                    </p>

                  </div>

                </div>


                {/* GPS DETAILS */}

                <div className="mt-4 space-y-3 rounded-xl bg-white p-4">


                  <div className="flex items-center justify-between gap-4">

                    <span className="text-xs font-semibold text-slate-500">
                      Latitude
                    </span>

                    <span className="text-xs font-bold text-slate-900">
                      {location.latitude.toFixed(6)}
                    </span>

                  </div>


                  <div className="flex items-center justify-between gap-4">

                    <span className="text-xs font-semibold text-slate-500">
                      Longitude
                    </span>

                    <span className="text-xs font-bold text-slate-900">
                      {location.longitude.toFixed(6)}
                    </span>

                  </div>


                  <div className="flex items-center justify-between gap-4">

                    <span className="text-xs font-semibold text-slate-500">
                      Accuracy
                    </span>

                    <span className="text-xs font-bold text-emerald-600">

                      ±{Math.round(location.accuracy)} meters

                    </span>

                  </div>

                </div>


                {/* LOCATION CAPTURED */}

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">

                  <CheckCircle2
                    size={20}
                    className="text-emerald-600"
                  />

                  <div>

                    <p className="text-sm font-black text-emerald-800">

                      Emergency Location Captured

                    </p>

                    <p className="text-xs text-emerald-700">

                      Ready to share with campus security.

                    </p>

                  </div>

                </div>


                {/* VIEW MAP */}

                <button
                  onClick={openLocationOnMap}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >

                  <MapPin size={18} />

                  View My Location on Map

                </button>

              </div>

            )}


            {/* ==================================================
                LOCATION ERROR
            ================================================== */}

            {sosConfirmed && locationError && !locationLoading && (

              <div className="mt-6 rounded-2xl bg-amber-50 p-5">

                <div className="flex items-start gap-3">

                  <AlertTriangle
                    size={22}
                    className="shrink-0 text-amber-600"
                  />

                  <div>

                    <p className="font-black text-amber-900">

                      Location unavailable

                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-700">

                      {locationError}

                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* ==================================================
                SOS ACTION BUTTONS
            ================================================== */}

            {sosConfirmed && (
              <div className="mt-5 grid grid-cols-2 gap-3">


              {/* CLOSE */}

              <button
                onClick={closeSOS}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >

                Close

              </button>


              {/* HOME */}

              <button
                onClick={() => {
                  closeSOS();
                  navigate("/");
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
              >

                🏠 Home

              </button>

              </div>
            )}

            {sosSuccess && (
              <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700">
                SOS alert sent successfully. Help is being notified.
              </p>
            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Home;
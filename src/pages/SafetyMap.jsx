import {
  ArrowLeft,
  LocateFixed,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const campusCenter = [11.0168, 76.9558];

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function SafetyMap() {
  const navigate = useNavigate();

  const incidents = [
    {
      id: 1,
      title: "Medical Assistance",
      location: "Main Block",
      position: [11.0175, 76.9565],
      severity: "High",
    },
    {
      id: 2,
      title: "Suspicious Activity",
      location: "Parking Area",
      position: [11.0162, 76.9548],
      severity: "Medium",
    },
    {
      id: 3,
      title: "Infrastructure Issue",
      location: "Hostel Block",
      position: [11.0181, 76.9571],
      severity: "Low",
    },
  ];

  const securityPoints = [
    {
      id: 1,
      name: "Security Office",
      position: [11.0165, 76.9552],
    },
    {
      id: 2,
      name: "Main Gate Security",
      position: [11.0158, 76.9560],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-black text-slate-900">
              Campus Safety Map
            </h1>

            <p className="text-sm text-slate-500">
              Live safety information around campus
            </p>
          </div>

        </div>
      </header>


      <main className="mx-auto max-w-7xl px-6 py-6">

        {/* TOP CARDS */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Siren size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Active Incidents
                </p>

                <p className="text-2xl font-black text-slate-900">
                  2
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Security Teams
                </p>

                <p className="text-2xl font-black text-slate-900">
                  4
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Users size={22} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Campus Status
                </p>

                <p className="text-lg font-black text-emerald-600">
                  Protected
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* MAP */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-black text-slate-900">
                Interactive Campus Map
              </h2>

              <p className="text-sm text-slate-500">
                Incidents and security locations
              </p>
            </div>

            <button
              onClick={() => {
                navigator.geolocation?.getCurrentPosition(
                  (position) => {
                    alert(
                      `Your location:\n${position.coords.latitude.toFixed(
                        6
                      )}, ${position.coords.longitude.toFixed(6)}`
                    );
                  },
                  () => {
                    alert("Unable to access your location.");
                  }
                );
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700"
            >
              <LocateFixed size={17} />
              Find My Location
            </button>

          </div>


          <div className="h-[520px]">

            <MapContainer
              center={campusCenter}
              zoom={17}
              scrollWheelZoom={true}
              className="h-full w-full"
            >

              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              {/* HIGH RISK ZONE */}
              <Circle
                center={[11.0175, 76.9565]}
                radius={120}
                pathOptions={{
                  color: "red",
                  fillColor: "red",
                  fillOpacity: 0.12,
                }}
              >

                <Popup>
                  <strong>High Risk Zone</strong>
                  <br />
                  Increased emergency activity detected.
                </Popup>

              </Circle>


              {/* MEDIUM RISK ZONE */}
              <Circle
                center={[11.0162, 76.9548]}
                radius={100}
                pathOptions={{
                  color: "orange",
                  fillColor: "orange",
                  fillOpacity: 0.10,
                }}
              >

                <Popup>
                  <strong>Medium Risk Zone</strong>
                  <br />
                  Monitor this area.
                </Popup>

              </Circle>


              {/* INCIDENT MARKERS */}
              {incidents.map((incident) => (

                <Marker
                  key={incident.id}
                  position={incident.position}
                  icon={defaultIcon}
                >

                  <Popup>

                    <div className="min-w-[180px]">

                      <p className="font-bold">
                        {incident.title}
                      </p>

                      <p className="text-sm">
                        📍 {incident.location}
                      </p>

                      <p className="mt-1 text-sm">
                        Severity:{" "}
                        <strong>{incident.severity}</strong>
                      </p>

                    </div>

                  </Popup>

                </Marker>

              ))}


              {/* SECURITY MARKERS */}
              {securityPoints.map((security) => (

                <Marker
                  key={security.id}
                  position={security.position}
                  icon={defaultIcon}
                >

                  <Popup>

                    <strong>
                      🛡️ {security.name}
                    </strong>

                    <p className="mt-1 text-sm">
                      Security personnel available.
                    </p>

                  </Popup>

                </Marker>

              ))}

            </MapContainer>

          </div>

        </div>


        {/* LEGEND */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">

          <h3 className="font-black text-slate-900">
            Map Legend
          </h3>

          <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-600">

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              High Risk
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orange-400" />
              Medium Risk
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              Safe Area
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              Security
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default SafetyMap;
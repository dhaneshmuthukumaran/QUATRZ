import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Flame,
  HeartPulse,
  Phone,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Preparedness() {
  const navigate = useNavigate();

  const emergencyContacts = [
    {
      name: "Campus Security",
      number: "100",
      icon: ShieldAlert,
      description: "Immediate campus security assistance",
    },
    {
      name: "Medical Emergency",
      number: "108",
      icon: HeartPulse,
      description: "Ambulance and medical assistance",
    },
    {
      name: "Fire Emergency",
      number: "101",
      icon: Flame,
      description: "Fire and rescue services",
    },
  ];

  const procedures = [
    {
      title: "Fire Emergency",
      icon: Flame,
      steps: [
        "Stay calm and alert people nearby.",
        "Use the nearest safe exit.",
        "Do not use elevators.",
        "Move to the designated assembly point.",
      ],
    },
    {
      title: "Medical Emergency",
      icon: HeartPulse,
      steps: [
        "Call campus security or medical services.",
        "Do not move an injured person unnecessarily.",
        "Keep the area clear for responders.",
        "Provide basic information to emergency personnel.",
      ],
    },
    {
      title: "Security Threat",
      icon: ShieldAlert,
      steps: [
        "Move away from the danger area.",
        "Avoid confrontation.",
        "Report the incident through CampusSafe.",
        "Follow instructions from campus security.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-5">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-black text-slate-900">
              Emergency Preparedness
            </h1>

            <p className="text-sm text-slate-500">
              Know what to do before an emergency happens
            </p>
          </div>

        </div>
      </header>


      <main className="mx-auto max-w-6xl px-6 py-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-lg">

          <div className="max-w-2xl">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <ShieldAlert size={25} />
            </div>

            <h2 className="text-3xl font-black">
              Stay prepared. Stay safe.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Quick access to emergency contacts, evacuation guidance,
              and campus safety procedures.
            </p>

            <button
              onClick={() => navigate("/report")}
              className="mt-6 rounded-xl bg-red-500 px-5 py-3 text-sm font-black text-white hover:bg-red-600"
            >
              Report an Emergency
            </button>

          </div>

        </section>


        {/* EMERGENCY CONTACTS */}
        <section className="mt-8">

          <div className="mb-4">

            <h2 className="text-xl font-black text-slate-900">
              Emergency Contacts
            </h2>

            <p className="text-sm text-slate-500">
              Call the appropriate service when immediate assistance is needed.
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-3">

            {emergencyContacts.map((contact) => {

              const Icon = contact.icon;

              return (
                <div
                  key={contact.name}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon size={22} />
                    </div>

                    <Phone size={18} className="text-slate-300" />

                  </div>

                  <h3 className="mt-5 font-black text-slate-900">
                    {contact.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {contact.description}
                  </p>

                  <a
                    href={`tel:${contact.number}`}
                    className="mt-4 block rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-black text-white hover:bg-slate-700"
                  >
                    Call {contact.number}
                  </a>

                </div>
              );
            })}

          </div>

        </section>


        {/* ASSEMBLY POINT */}
        <section className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Users size={23} />
            </div>

            <div>

              <h2 className="font-black text-emerald-900">
                Campus Assembly Point
              </h2>

              <p className="mt-1 text-sm leading-6 text-emerald-800">
                During an evacuation, move calmly to the designated
                assembly point and remain there until campus authorities
                provide further instructions.
              </p>

              <button
                onClick={() => navigate("/map")}
                className="mt-4 flex items-center gap-2 text-sm font-black text-emerald-800"
              >
                View on Safety Map
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </section>


        {/* PROCEDURES */}
        <section className="mt-8">

          <div className="mb-4">

            <h2 className="text-xl font-black text-slate-900">
              Emergency Procedures
            </h2>

            <p className="text-sm text-slate-500">
              Follow these basic steps during common campus emergencies.
            </p>

          </div>


          <div className="space-y-4">

            {procedures.map((procedure) => {

              const Icon = procedure.icon;

              return (
                <div
                  key={procedure.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon size={22} />
                    </div>

                    <h3 className="font-black text-slate-900">
                      {procedure.title}
                    </h3>

                  </div>


                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    {procedure.steps.map((step, index) => (

                      <div
                        key={step}
                        className="flex gap-3 rounded-2xl bg-slate-50 p-4"
                      >

                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          {index + 1}
                        </span>

                        <p className="text-sm leading-5 text-slate-600">
                          {step}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* FOOTER MESSAGE */}
        <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 text-center">

          <Building2
            size={25}
            className="mx-auto text-blue-600"
          />

          <h3 className="mt-3 font-black text-blue-900">
            Your safety matters
          </h3>

          <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-blue-700">
            Familiarize yourself with emergency exits, assembly points,
            and campus emergency contacts before an incident occurs.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Preparedness;
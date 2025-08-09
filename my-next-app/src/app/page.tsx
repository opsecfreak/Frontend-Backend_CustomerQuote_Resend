import Form from "./components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center text-sky-400">Unlock Your Business Potential with AI</h1>
        <p className="text-md text-gray-300 mb-6 text-center">
          Request a quote to see how our AI solutions can boost your company's revenue, productivity, and overall workflow.
        </p>
        <Form />
      </div>
    </main>
  );
}

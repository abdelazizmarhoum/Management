import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ProcessingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Get the 'text' parameter from the URL
  const text = searchParams.get('text');

  useEffect(() => {
    // If there's no text in the URL, navigate back to the start
    if (!text) {
      navigate('/');
      return;
    }

    const processData = async () => {
      try {
        // Make the POST request to our backend
        const response = await axios.post('http://127.0.0.1:8000/analyze', {
          description: text,
        });

        // On success, navigate to the result page with the data
        const resultData = response.data;
        navigate(`/result?data=${encodeURIComponent(JSON.stringify(resultData))}`);

      } catch (err) {
        // If there's an error, save it to state
        console.error("API call failed:", err);
        setError("Échec de la connexion au backend. Veuillez vous assurer qu'il est en cours d'exécution.");
      }
    };

    processData();
  }, [text, navigate]); // This effect runs when the component mounts and when 'text' changes

  // --- RENDER LOGIC ---

  // If there's an error, display it
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="bg-white p-8 rounded-2xl shadow-large w-full max-w-lg text-center border border-red-100">
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 font-heading">Une Erreur s'est Produite</h2>
          <p className="mt-4 text-neutral-700">{error}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-soft"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-all duration-300 shadow-soft"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the loading state
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="bg-white p-10 rounded-2xl shadow-large w-full max-w-md text-center border border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-6 font-heading">
          Analyse de votre transaction...
        </h2>
        <div className="mb-6">
          <LoadingSpinner />
        </div>
        <p className="text-neutral-600">
          Notre IA traite votre description de transaction pour générer des entrées comptables précises.
        </p>
      </div>
    </div>
  );
}
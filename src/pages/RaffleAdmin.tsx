import { useState, useEffect } from 'react';
import { Trophy, Users, RefreshCw } from 'lucide-react';
import { supabase, RaffleEntry } from '@/lib/supabase';

export function RaffleAdmin() {
  const [entries, setEntries] = useState<RaffleEntry[]>([]);
  const [winner, setWinner] = useState<RaffleEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = 'GeneratorRaffle2025'; // In production, use proper auth

  useEffect(() => {
    if (authenticated) {
      fetchEntries();
    }
  }, [authenticated]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('raffle_entries')
        .select('*')
        .order('entered_at', { ascending: true });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
      alert('Error fetching entries. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const selectWinner = () => {
    if (entries.length === 0) {
      alert('No entries to select from!');
      return;
    }

    // Animate selection
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * entries.length);
      setWinner(entries[randomIndex]);
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        // Final winner
        const finalIndex = Math.floor(Math.random() * entries.length);
        setWinner(entries[finalIndex]);
      }
    }, 100);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-generator-darkGreen mb-4">Raffle Admin</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              alert('Incorrect password');
            }
          }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              type="submit"
              className="w-full bg-generator-green text-white font-medium py-2 rounded-lg hover:bg-generator-darkGreen"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-generator-darkGreen">Raffle Admin</h1>
            <button
              onClick={fetchEntries}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-generator-green" />
                <h2 className="text-xl font-semibold">Total Entries</h2>
              </div>
              <p className="text-4xl font-bold text-generator-darkGreen">{entries.length}</p>
            </div>

            {/* Winner Selection */}
            <div className="bg-generator-green/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-6 w-6 text-generator-green" />
                <h2 className="text-xl font-semibold">Select Winner</h2>
              </div>
              <button
                onClick={selectWinner}
                disabled={entries.length === 0}
                className="w-full bg-generator-green text-white font-medium py-3 rounded-lg hover:bg-generator-darkGreen disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pick Random Winner
              </button>
            </div>
          </div>

          {/* Winner Display */}
          {winner && (
            <div className="mt-8 bg-generator-gold/20 rounded-lg p-8 text-center">
              <Trophy className="h-16 w-16 text-generator-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-generator-darkGreen mb-2">
                🎉 Winner: {winner.first_name} {winner.last_name} 🎉
              </h2>
              <p className="text-lg text-gray-600">
                Phone: {winner.phone}<br />
                Email: {winner.email}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Entered at: {new Date(winner.entered_at).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Entries Table */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-generator-darkGreen mb-4">All Entries</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-4">#</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Phone</th>
                  <th className="text-left py-2 px-4">Entered At</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{entry.first_name} {entry.last_name}</td>
                    <td className="py-2 px-4">{entry.email}</td>
                    <td className="py-2 px-4">{entry.phone}</td>
                    <td className="py-2 px-4">
                      {new Date(entry.entered_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {entries.length === 0 && (
              <p className="text-center py-8 text-gray-500">No entries yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
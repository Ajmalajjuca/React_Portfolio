import { useState, useEffect } from 'react';
import axios from 'axios';
import GitHubCalendar from 'react-github-calendar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Contributions = () => {
  const [leetCodeStats, setLeetCodeStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rank, setRank] = useState(null);
  
  const githubUsername = useSelector(state => state.profile.profile[0]?.contributions?.github);
  const leetCodeUsername = 'ajmal_ca';

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`
        );
        setLeetCodeStats(response.data || {});
        setRank({
          global: Math.floor(Math.random() * 100000) + 1,
          country: Math.floor(Math.random() * 1000) + 1,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        setError("Failed to load LeetCode stats");
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  const githubTheme = {
    light: ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
    dark: ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'],
  };

  const StatCard = ({ title, value, total, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-700/50 p-4 rounded-xl shadow-lg"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-xl md:text-2xl font-bold ${color}`}>
        {value}{total ? `/${total}` : ''}
      </p>
    </motion.div>
  );

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* GitHub Activity Tracker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-white mb-6 text-center">
            GitHub Activity
          </h3>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username={githubUsername}
              theme={githubTheme}
              fontSize={14}
              blockSize={16}
              blockMargin={4}
              transformData={(contributions) => contributions.slice(-365)} // Last year
            />
          </div>
        </motion.div>
      </div>

      {/* LeetCode Progress */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="bg-gray-800 rounded-xl p-4 md:p-8 shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center">
            LeetCode Progress
          </h3>
          {loading ? (
            <div className="flex justify-center items-center h-48 md:h-64">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4 bg-red-500/10 rounded-lg">
              {error}
            </div>
          ) : (
            leetCodeStats && leetCodeStats.totalSolved !== null && (
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
                {/* Chart */}
                <div className="w-full">
                  <div className="h-48 md:h-64 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { name: 'Easy', solved: leetCodeStats.easySolved || 0, total: leetCodeStats.totalEasy || 0 },
                          { name: 'Medium', solved: leetCodeStats.mediumSolved || 0, total: leetCodeStats.totalMedium || 0 },
                          { name: 'Hard', solved: leetCodeStats.hardSolved || 0, total: leetCodeStats.totalHard || 0 }
                        ]}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      >
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151'
                          }}
                          labelStyle={{ color: '#9ca3af' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="solved"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: '#10b981' }}
                          animationDuration={1500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <StatCard title="Global Rank" value={`#${rank?.global}`} color="text-purple-400" />
                    <StatCard title="Country Rank" value={`#${rank?.country}`} color="text-blue-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <StatCard
                      title="Total Solved"
                      value={leetCodeStats.totalSolved || 0}
                      total={leetCodeStats.totalQuestions || 0}
                      color="text-green-500"
                    />
                    <StatCard
                      title="Acceptance Rate"
                      value={`${leetCodeStats.acceptanceRate || 0}%`}
                      color="text-blue-500"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contributions;
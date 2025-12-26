import React from 'react';
import { Trophy, Award, Medal, Star, TrendingUp } from 'lucide-react';
import { useGetToppers } from '../../../apis/useUserDataController';

function Toppers() {
    const { data, isLoading, error } = useGetToppers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <Trophy className="mx-auto mb-4 text-red-500" size={64} />
                <p className="text-xl font-semibold text-red-600">Failed to load toppers</p>
                <p className="text-gray-600 mt-2">Please try again later</p>
            </div>
        );
    }

    const toppers = data?.topStudents || [];
    
    if (toppers.length === 0) {
        return (
            <div className="text-center py-20">
                <Trophy className="mx-auto mb-4 text-gray-400" size={64} />
                <p className="text-xl font-semibold text-gray-600">No toppers available yet</p>
                <p className="text-gray-500 mt-2">Check back later for results</p>
            </div>
        );
    }

    const topThree = toppers.slice(0, 3);
    const remaining = toppers.slice(3);

    const getRankStyle = (idx) => {
        switch(idx) {
            case 0:
                return {
                    gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
                    border: 'border-yellow-300',
                    icon: '🥇',
                    shadow: 'shadow-2xl shadow-yellow-500/50',
                    badge: 'bg-yellow-600',
                    title: '1st Place'
                };
            case 1:
                return {
                    gradient: 'from-gray-300 via-gray-400 to-gray-500',
                    border: 'border-gray-300',
                    icon: '🥈',
                    shadow: 'shadow-xl shadow-gray-400/50',
                    badge: 'bg-gray-600',
                    title: '2nd Place'
                };
            case 2:
                return {
                    gradient: 'from-orange-400 via-orange-500 to-orange-600',
                    border: 'border-orange-300',
                    icon: '🥉',
                    shadow: 'shadow-xl shadow-orange-500/50',
                    badge: 'bg-orange-600',
                    title: '3rd Place'
                };
            default:
                return {
                    gradient: 'from-white to-gray-50',
                    border: 'border-gray-200',
                    icon: '⭐',
                    shadow: 'shadow-md',
                    badge: 'bg-green-600',
                    title: `${idx + 1}th Place`
                };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-8 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="text-yellow-600 animate-bounce" size={48} />
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        Hall of Excellence
                    </h2>
                    <Trophy className="text-yellow-600 animate-bounce" size={48} />
                </div>
                <p className="text-gray-600 text-lg">Celebrating Academic Excellence & Outstanding Achievements</p>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Top 3 Podium Display */}
                {topThree.length > 0 && (
                    <div className="mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
                            {/* 2nd Place */}
                            {topThree[1] && (
                                <div className="order-1 md:order-1 transform md:translate-y-8">
                                    <TopperCard topper={topThree[1]} rank={1} style={getRankStyle(1)} />
                                </div>
                            )}

                            {/* 1st Place */}
                            {topThree[0] && (
                                <div className="order-first md:order-2">
                                    <TopperCard topper={topThree[0]} rank={0} style={getRankStyle(0)} isPodiumTop />
                                </div>
                            )}

                            {/* 3rd Place */}
                            {topThree[2] && (
                                <div className="order-2 md:order-3 transform md:translate-y-12">
                                    <TopperCard topper={topThree[2]} rank={2} style={getRankStyle(2)} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Remaining Toppers */}
                {remaining.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                            <Star className="text-green-600" size={28} />
                            More Top Performers
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remaining.map((topper, idx) => (
                                <RemainingTopperCard 
                                    key={topper._id} 
                                    topper={topper} 
                                    rank={idx + 3} 
                                    style={getRankStyle(idx + 3)} 
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Top 3 Podium Card Component
function TopperCard({ topper, rank, style, isPodiumTop = false }) {
    return (
        <div className={`relative ${isPodiumTop ? 'transform scale-105' : ''}`}>
            <div className={`bg-gradient-to-br ${style.gradient} rounded-2xl p-6 ${style.shadow} border-4 ${style.border} transition-all hover:scale-105 hover:rotate-1`}>
                {/* Crown for 1st place */}
                {isPodiumTop && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
                        👑
                    </div>
                )}

                {/* Medal Icon */}
                <div className="text-center mb-4">
                    <div className="text-7xl mb-2">{style.icon}</div>
                    <div className={`inline-block ${style.badge} text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg`}>
                        {style.title}
                    </div>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                    <div className={`relative w-28 h-28 ${isPodiumTop ? 'w-32 h-32' : ''}`}>
                        <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topper.name)}&size=200&background=random&bold=true`}
                            alt={topper.name}
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                            <Trophy className="text-yellow-600" size={20} />
                        </div>
                    </div>
                </div>

                {/* Student Info */}
                <div className="text-center text-white">
                    <h3 className={`font-bold mb-2 ${isPodiumTop ? 'text-2xl' : 'text-xl'}`}>
                        {topper.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3 capitalize">
                        {topper.class}
                    </p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
                        <div className="flex items-center justify-center gap-2">
                            <TrendingUp size={20} />
                            <span className="text-2xl font-bold">{topper.totalMark}</span>
                        </div>
                        <p className="text-xs mt-1">Total Marks</p>
                    </div>
                </div>

                {/* Decorative Stars */}
                <div className="absolute top-2 right-2 text-yellow-300 animate-pulse">⭐</div>
                <div className="absolute bottom-2 left-2 text-yellow-300 animate-pulse">✨</div>
            </div>
        </div>
    );
}

// Remaining Toppers Card Component
function RemainingTopperCard({ topper, rank, style }) {
    return (
        <div className={`bg-white rounded-xl p-5 ${style.shadow} border-2 ${style.border} transition-all hover:scale-105 hover:shadow-xl`}>
            <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${style.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {rank + 1}
                </div>

                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(topper.name)}&size=150&background=random`}
                        alt={topper.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-gray-200"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow">
                        <Award className="text-white" size={14} />
                    </div>
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-lg truncate">{topper.name}</h4>
                    <p className="text-gray-600 text-sm truncate capitalize">{topper.class}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <Medal className="text-green-600" size={16} />
                        <span className="font-bold text-green-600">{topper.totalMark} Marks</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Toppers;
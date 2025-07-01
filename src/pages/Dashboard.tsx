import { useState } from "react";
import { Home, Settings, DollarSign, LogOut, X, Expand, Minimize } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContest"

interface WordAnalysis {
  word: string;
  meaning: string;
  baseForm?: string;
  partOfSpeech?: string;
}

interface PinnedTranslation {
  id: string;
  word: string;
  meaning: string;
  baseForm?: string;
  partOfSpeech?: string;
}

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [wordAnalysis, setWordAnalysis] = useState<WordAnalysis[]>([]);
  const [pinnedTranslations, setPinnedTranslations] = useState<PinnedTranslation[]>([]);
  const [showWordPanel, setShowWordPanel] = useState(false);
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);
  const { logout } = useAuth();
  
  // Mock Chinese poem analysis data
  const mockChineseAnalysis: { [key: string]: WordAnalysis } = {
    "风": { word: "风", meaning: "wind", partOfSpeech: "noun" },
    "急": { word: "急", meaning: "urgent, swift", partOfSpeech: "adjective" },
    "天": { word: "天", meaning: "sky, heaven", partOfSpeech: "noun" },
    "高": { word: "高", meaning: "high, tall", partOfSpeech: "adjective" },
    "猿": { word: "猿", meaning: "ape, monkey", partOfSpeech: "noun" },
    "啸": { word: "啸", meaning: "to howl, whistle", partOfSpeech: "verb" },
    "哀": { word: "哀", meaning: "sorrow, grief", partOfSpeech: "adjective" },
    "渚": { word: "渚", meaning: "small island, sandbar", partOfSpeech: "noun" },
    "清": { word: "清", meaning: "clear, pure", partOfSpeech: "adjective" },
    "沙": { word: "沙", meaning: "sand", partOfSpeech: "noun" },
    "白": { word: "白", meaning: "white", partOfSpeech: "adjective" },
    "鸟": { word: "鸟", meaning: "bird", partOfSpeech: "noun" },
    "飞": { word: "飞", meaning: "to fly", partOfSpeech: "verb" },
    "回": { word: "回", meaning: "to return", partOfSpeech: "verb" },
    "无": { word: "无", meaning: "without, no", partOfSpeech: "adverb" },
    "边": { word: "边", meaning: "edge, border", partOfSpeech: "noun" },
    "落": { word: "落", meaning: "to fall, drop", partOfSpeech: "verb" },
    "木": { word: "木", meaning: "tree, wood", partOfSpeech: "noun" },
    "萧": { word: "萧", meaning: "desolate sound", partOfSpeech: "adjective" },
    "下": { word: "下", meaning: "down, below", partOfSpeech: "direction" },
    "不": { word: "不", meaning: "not", partOfSpeech: "adverb" },
    "尽": { word: "尽", meaning: "endless, all", partOfSpeech: "adjective" },
    "长": { word: "长", meaning: "long", partOfSpeech: "adjective" },
    "江": { word: "江", meaning: "river", partOfSpeech: "noun" },
    "滚": { word: "滚", meaning: "to roll", partOfSpeech: "verb" },
    "来": { word: "来", meaning: "to come", partOfSpeech: "verb" },
    "万": { word: "万", meaning: "ten thousand", partOfSpeech: "number" },
    "里": { word: "里", meaning: "mile, distance", partOfSpeech: "noun" },
    "悲": { word: "悲", meaning: "sad, grief", partOfSpeech: "adjective" },
    "秋": { word: "秋", meaning: "autumn", partOfSpeech: "noun" },
    "常": { word: "常", meaning: "often, always", partOfSpeech: "adverb" },
    "作": { word: "作", meaning: "to be, act as", partOfSpeech: "verb" },
    "客": { word: "客", meaning: "guest, traveler", partOfSpeech: "noun" },
    "百": { word: "百", meaning: "hundred", partOfSpeech: "number" },
    "年": { word: "年", meaning: "year", partOfSpeech: "noun" },
    "多": { word: "多", meaning: "many, much", partOfSpeech: "adjective" },
    "病": { word: "病", meaning: "illness, sick", partOfSpeech: "noun" },
    "独": { word: "独", meaning: "alone", partOfSpeech: "adverb" },
    "登": { word: "登", meaning: "to climb, ascend", partOfSpeech: "verb" },
    "台": { word: "台", meaning: "platform, terrace", partOfSpeech: "noun" },
    "艰": { word: "艰", meaning: "difficult", partOfSpeech: "adjective" },
    "难": { word: "难", meaning: "difficult", partOfSpeech: "adjective" },
    "苦": { word: "苦", meaning: "bitter, suffering", partOfSpeech: "adjective" },
    "恨": { word: "恨", meaning: "hate, regret", partOfSpeech: "verb" },
    "繁": { word: "繁", meaning: "numerous, dense", partOfSpeech: "adjective" },
    "霜": { word: "霜", meaning: "frost", partOfSpeech: "noun" },
    "鬓": { word: "鬓", meaning: "temples (hair)", partOfSpeech: "noun" },
    "潦": { word: "潦", meaning: "down and out", partOfSpeech: "adjective" },
    "倒": { word: "倒", meaning: "fallen, dejected", partOfSpeech: "adjective" },
    "新": { word: "新", meaning: "new, recent", partOfSpeech: "adjective" },
    "停": { word: "停", meaning: "to stop", partOfSpeech: "verb" },
    "浊": { word: "浊", meaning: "muddy, turbid", partOfSpeech: "adjective" },
    "酒": { word: "酒", meaning: "wine, alcohol", partOfSpeech: "noun" },
    "杯": { word: "杯", meaning: "cup", partOfSpeech: "noun" }
  };
  
  // Mock recommended content
  const recommendedContent = [
    {
      title: "Spanish News: Technology Trends",
      description: "Learn tech vocabulary with current events",
      difficulty: "Intermediate",
      duration: "8 min read"
    },
    {
      title: "French Cooking Tutorial",
      description: "Master culinary terms while learning recipes",
      difficulty: "Beginner",
      duration: "12 min video"
    },
    {
      title: "German Business Podcast",
      description: "Professional vocabulary for workplace conversations",
      difficulty: "Advanced",
      duration: "25 min audio"
    }
  ];

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);

    try {
      // Check if input is the Chinese poem for mock demonstration
      const isChinesePoem = content.includes("风急天高猿啸哀") || content.includes("渚清沙白鸟飞回");
      
      if (isChinesePoem) {
        // Mock Chinese analysis
        const chineseText = `风急天高猿啸哀，渚清沙白鸟飞回。
                             无边落木萧萧下，不尽长江滚滚来。
                             万里悲秋常作客，百年多病独登台。
                             艰难苦恨繁霜鬓，潦倒新停浊酒杯。`;
        
        setAnalysisResult(chineseText);
        
        // Extract Chinese characters for analysis
        const chineseAnalysis: WordAnalysis[] = [];
        for (const char of chineseText) {
          if (mockChineseAnalysis[char]) {
            chineseAnalysis.push(mockChineseAnalysis[char]);
          }
        }
        setWordAnalysis(chineseAnalysis);
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        console.log("Translation List:", data.analysis);
        
        // Mock analysis result for demonstration
        setAnalysisResult(content);
        const mockAnalysis: WordAnalysis[] = content.split(/\s+/).map(word => ({
          word: word.replace(/[^\w]/g, ''),
          meaning: `Translation of "${word.replace(/[^\w]/g, '')}"`,
          baseForm: word.replace(/[^\w]/g, '').toLowerCase(),
          partOfSpeech: "noun"
        })).filter(item => item.word.length > 0);
        setWordAnalysis(mockAnalysis);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error('There was an error sending the request!', error);
      // Mock analysis for demo when backend is not available
      setAnalysisResult(content);
      const mockAnalysis: WordAnalysis[] = content.split(/\s+/).map(word => ({
        word: word.replace(/[^\w]/g, ''),
        meaning: `Translation of "${word.replace(/[^\w]/g, '')}"`,
        baseForm: word.replace(/[^\w]/g, '').toLowerCase(),
        partOfSpeech: "noun"
      })).filter(item => item.word.length > 0);
      setWordAnalysis(mockAnalysis);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordClick = (wordData: WordAnalysis) => {
    const newPinned: PinnedTranslation = {
      id: `${wordData.word}-${Date.now()}`,
      ...wordData
    };
    
    setPinnedTranslations(prev => {
      const exists = prev.find(item => item.word === wordData.word);
      if (exists) return prev;
      return [...prev, newPinned];
    });
    setShowWordPanel(true);
  };

  const removePinnedTranslation = (id: string) => {
    setPinnedTranslations(prev => prev.filter(item => item.id !== id));
    if (pinnedTranslations.length <= 1) {
      setShowWordPanel(false);
    }
  };

  const renderAnalyzedText = () => {
    if (!analysisResult) return null;

    // Handle Chinese text differently
    const isChinese = /[\u4e00-\u9fff]/.test(analysisResult);
    
    if (isChinese) {
      return (
        <div className="w-full bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Result</h3>
          <div className="text-lg leading-relaxed font-serif">
            <TooltipProvider>
              {analysisResult.split('').map((char, index) => {
                const wordData = mockChineseAnalysis[char];
                
                if (!wordData || /[\s，。\n]/.test(char)) {
                  return <span key={index} className={char === '\n' ? 'block' : ''}>{char === '\n' ? '' : char}</span>;
                }

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <span
                        className="cursor-pointer hover:bg-yellow-100 hover:underline rounded px-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-yellow-100"
                        onClick={() => handleWordClick(wordData)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleWordClick(wordData);
                          }
                        }}
                        role="button"
                        aria-label={`Click to pin translation for ${wordData.word}`}
                      >
                        {char}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="text-sm">
                        <div className="font-semibold">{wordData.word}</div>
                        <div className="text-gray-600">{wordData.meaning}</div>
                        {wordData.partOfSpeech && (
                          <div className="text-xs text-gray-500 mt-1">
                            {wordData.partOfSpeech}
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Poem Translation:</strong> This is Du Fu's famous poem "Ascending the Heights" (登高), expressing the poet's feelings of loneliness and hardship while traveling far from home in autumn.
          </div>
        </div>
      );
    }

    // Regular text analysis (existing code)
    const words = analysisResult.split(/(\s+)/);
    
    return (
      <div className="w-full bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Result</h3>
        <div className="text-base leading-relaxed">
          <TooltipProvider>
            {words.map((segment, index) => {
              const cleanWord = segment.replace(/[^\w]/g, '');
              const wordData = wordAnalysis.find(w => w.word === cleanWord);
              
              if (!wordData || segment.trim() === '') {
                return <span key={index}>{segment}</span>;
              }

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <span
                      className="cursor-pointer hover:bg-cyan-100 hover:underline rounded px-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-cyan-100"
                      onClick={() => handleWordClick(wordData)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleWordClick(wordData);
                        }
                      }}
                      role="button"
                      aria-label={`Click to pin translation for ${wordData.word}`}
                    >
                      {segment}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="text-sm">
                      <div className="font-semibold">{wordData.word}</div>
                      <div className="text-gray-600">{wordData.meaning}</div>
                      {wordData.baseForm && (
                        <div className="text-xs text-gray-500 mt-1">
                          Base: {wordData.baseForm}
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    );
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-cyan-600"
              title="Dashboard"
            >
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">VORP</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-cyan-600"
              title="Dashboard"
            >
              <Home size={20} />
            </Link>
            <Link
              to="/pricing"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Pricing"
            >
              <DollarSign size={20} />
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="rounded-xl"
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex max-w-7xl mx-auto px-6 py-12 gap-6">
        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${showWordPanel ? 'mr-80' : ''}`}>
          {/* Content Analysis Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Analyze Content for Language Learning
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform any content into personalized language learning material
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto mb-12">
            {/* Input Section with Consistent Width */}
            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Paste text, news URL, or YouTube URL here… and we'll analyze the content for language learning."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`w-full resize-none border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-xl text-base transition-all duration-300 ${
                      isTextareaExpanded 
                        ? 'min-h-[400px] max-h-[800px]' 
                        : 'min-h-[200px] max-h-[200px]'
                    }`}
                    style={{
                      height: isTextareaExpanded ? 'auto' : '200px'
                    }}
                  />
                </div>
                
                {/* Expand/Collapse Toggle */}
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTextareaExpanded(!isTextareaExpanded)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition-colors duration-200"
                  >
                    {isTextareaExpanded ? (
                      <>
                        <Minimize size={16} />
                        <span>Collapse Input</span>
                      </>
                    ) : (
                      <>
                        <Expand size={16} />
                        <span>Expand Input</span>
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    We support plain text, news articles, and YouTube links.
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim() || isLoading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl py-3 text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>
            </div>

            {/* Analysis Result - Same Width as Input */}
            {renderAnalyzedText()}
          </div>

          {/* Recommended Content Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                Recommended Learning Content
              </h3>
              <p className="text-gray-600">
                Curated content tailored to your learning level
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recommendedContent.map((item, index) => (
                <Card key={index} className="rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{item.duration}</span>
                    </div>
                    <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full rounded-lg">
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Word Meaning Panel - Right Sidebar */}
        {showWordPanel && (
          <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-40 overflow-y-auto animate-slide-in-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Word Meanings</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWordPanel(false)}
                  className="p-1 h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                {pinnedTranslations.map((translation) => (
                  <div
                    key={translation.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-fade-in"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1 text-lg">
                          {translation.word}
                        </div>
                        <div className="text-gray-600 text-sm mb-2">
                          {translation.meaning}
                        </div>
                        {translation.baseForm && (
                          <div className="text-xs text-gray-500">
                            Base form: {translation.baseForm}
                          </div>
                        )}
                        {translation.partOfSpeech && (
                          <div className="text-xs text-gray-500">
                            Part of speech: {translation.partOfSpeech}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePinnedTranslation(translation.id)}
                        className="p-1 h-6 w-6 ml-2 flex-shrink-0"
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {pinnedTranslations.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>Click on words in the analyzed text to pin their translations here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

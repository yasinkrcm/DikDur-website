import { GoogleGenerativeAI } from "@google/generative-ai";

// Debug için API key'i kontrol et
const apiKey = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY exists:", !!apiKey);
console.log("GEMINI_API_KEY length:", apiKey?.length);
console.log("GEMINI_API_KEY starts with:", apiKey?.substring(0, 10));

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request) {
  try {
    // API key kontrolü
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return Response.json({ 
        error: 'API key is not configured',
        recommendations: [
          {
            title: "API Key Hatası",
            description: "Gemini AI API key'i yapılandırılmamış. Lütfen .env.local dosyasını kontrol edin.",
            priority: "high",
            category: "critical",
            icon: "Brain"
          }
        ]
      }, { status: 500 });
    }

    const { averageScore, language = 'tr' } = await request.json();

    if (!averageScore) {
      return Response.json({ error: 'Average score is required' }, { status: 400 });
    }

    // Dil bazlı prompt oluştur
    let prompt;
    let fallbackRecommendations;

    if (language === 'en') {
      prompt = `
      You are an expert physiotherapist and ergonomics specialist.
      A company's average posture score: ${averageScore}/100
      
      Based on this score, provide personalized posture recommendations for company employees.
      
      Recommendations should be in this format:
      - Title (short and clear)
      - Description (detailed and actionable)
      - Priority level (high/medium/low)
      - Category (critical/improvement/maintenance/setup/routine)
      - Icon (Brain/Lightbulb/TrendingUp/Clock/Sparkles)
      
      ${averageScore >= 80 ? 'Excellent score - recommend maintenance and advanced exercises' : 
        averageScore >= 60 ? 'Good score - provide improvement and routine recommendations' : 
        'Low score - recommend critical improvements and ergonomic adjustments'}
      
      Respond only in JSON format, no other explanation:
      {
        "recommendations": [
          {
            "title": "Recommendation title",
            "description": "Detailed description",
            "priority": "high/medium/low",
            "category": "critical/improvement/maintenance/setup/routine",
            "icon": "Brain/Lightbulb/TrendingUp/Clock/Sparkles"
          }
        ]
      }
      `;

      fallbackRecommendations = {
        recommendations: [
          {
            title: "Conduct Posture Analysis",
            description: "Regularly perform posture analysis to track your progress.",
            priority: "high",
            category: "improvement",
            icon: "Brain"
          },
          {
            title: "Ergonomic Adjustments",
            description: "Arrange your workspace according to ergonomic principles.",
            priority: "high",
            category: "setup",
            icon: "Lightbulb"
          }
        ]
      };
    } else {
      // Türkçe prompt (varsayılan)
      prompt = `
      Sen bir uzman fizyoterapist ve ergonomi uzmanısın. 
      Bir şirketin ortalama duruş skoru: ${averageScore}/100
      
      Bu skora göre şirket çalışanları için kişiselleştirilmiş duruş önerileri ver.
      
      Öneriler şu formatta olmalı:
      - Başlık (kısa ve net)
      - Açıklama (detaylı ve uygulanabilir)
      - Öncelik seviyesi (high/medium/low)
      - Kategori (critical/improvement/maintenance/setup/routine)
      - İkon (Brain/Lightbulb/TrendingUp/Clock/Sparkles)
      
      ${averageScore >= 80 ? 'Mükemmel skor - sürdürme ve gelişmiş egzersizler öner' : 
        averageScore >= 60 ? 'İyi skor - iyileştirme ve rutin önerileri ver' : 
        'Düşük skor - kritik iyileştirmeler ve ergonomik düzenlemeler öner'}
      
      Sadece JSON formatında yanıt ver, başka açıklama ekleme:
      {
        "recommendations": [
          {
            "title": "Öneri başlığı",
            "description": "Detaylı açıklama",
            "priority": "high/medium/low",
            "category": "critical/improvement/maintenance/setup/routine",
            "icon": "Brain/Lightbulb/TrendingUp/Clock/Sparkles"
          }
        ]
      }
      `;

      fallbackRecommendations = {
        recommendations: [
          {
            title: "Duruş Analizi Yapın",
            description: "Düzenli olarak duruş analizi yaparak gelişiminizi takip edin.",
            priority: "high",
            category: "improvement",
            icon: "Brain"
          },
          {
            title: "Ergonomik Düzenlemeler",
            description: "Çalışma alanınızı ergonomik prensiplere göre düzenleyin.",
            priority: "high",
            category: "setup",
            icon: "Lightbulb"
          }
        ]
      };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    console.log(`Sending request to Gemini AI with language: ${language}...`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini AI response received, length:", text.length);

    // JSON'u parse et
    let recommendations;
    try {
      // JSON bloğunu bul ve parse et
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON not found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback öneriler
      recommendations = fallbackRecommendations;
    }

    return Response.json(recommendations);

  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    // Hata mesajını da dile göre ayarla
    const errorMessage = language === 'en' 
      ? "System Error"
      : "Sistem Hatası";
    const errorDescription = language === 'en'
      ? "Recommendations cannot be generated at the moment. Please try again later."
      : "Şu anda öneriler oluşturulamıyor. Lütfen daha sonra tekrar deneyin.";

    return Response.json(
      { 
        error: 'Failed to generate recommendations',
        recommendations: [
          {
            title: errorMessage,
            description: errorDescription,
            priority: "medium",
            category: "improvement",
            icon: "Brain"
          }
        ]
      }, 
      { status: 500 }
    );
  }
} 
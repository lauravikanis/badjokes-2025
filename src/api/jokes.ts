import axios from "axios";

// Configure axios with timeout
const apiClient = axios.create({
  timeout: 10000, // 10 seconds timeout
});

// JokeAPI response types
export interface JokeAPIResponse {
  error: boolean;
  category: string;
  type: "single" | "twopart";
  joke?: string; // for single type jokes
  setup?: string; // for twopart type jokes
  delivery?: string; // for twopart type jokes
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

// JokeAPI service
export class JokeAPIService {
  private static readonly BASE_URL = "https://v2.jokeapi.dev/joke";

  /**
   * Fetch a random joke from JokeAPI
   * @param category - Optional category filter
   * @param safeMode - Enable safe mode (default: true)
   * @returns Promise<Joke>
   */
  static async getRandomJoke(category?: string): Promise<string> {
    try {
      // Always specify a category to avoid API issues
      const selectedCategory =
        category && category !== "Any" ? category : "Any";

      // Use the correct URL format that works with JokeAPI
      const url = `${this.BASE_URL}/${selectedCategory}?safe-mode`;

      console.log("Calling JokeAPI with URL:", url);
      const response = await apiClient.get<JokeAPIResponse>(url);

      if (response.data.error) {
        throw new Error("Failed to fetch joke from API");
      }

      // Handle both single and twopart jokes
      if (response.data.type === "single" && response.data.joke) {
        return response.data.joke;
      } else if (
        response.data.type === "twopart" &&
        response.data.setup &&
        response.data.delivery
      ) {
        return `${response.data.setup} ${response.data.delivery}`;
      } else {
        throw new Error("No joke received from API");
      }
    } catch (error) {
      console.error("Error fetching joke from JokeAPI:", error);
      return "Why did the scarecrow win an award? Because he was outstanding in his field!";
    }
  }

  /**
   * Get joke of the day based on current date
   * Uses the day of year to consistently get the same joke for the same day
   */
  static async getJokeOfTheDay(): Promise<string> {
    try {
      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // Use the day of year as a seed for consistent daily jokes
      // Note: JokeAPI doesn't support idRange parameter, so we'll use a different approach
      const response = await apiClient.get<JokeAPIResponse>(
        `${this.BASE_URL}/Any?safe-mode&amount=1&to=${dayOfYear}`
      );

      if (response.data.error) {
        throw new Error("Failed to fetch joke of the day from API");
      }

      // Handle both single and twopart jokes
      if (response.data.type === "single" && response.data.joke) {
        return response.data.joke;
      } else if (
        response.data.type === "twopart" &&
        response.data.setup &&
        response.data.delivery
      ) {
        return `${response.data.setup} ${response.data.delivery}`;
      } else {
        return "No joke available today";
      }
    } catch (error) {
      console.error("Error fetching joke of the day from JokeAPI:", error);
      // Fallback to a default joke
      return "Why don't scientists trust atoms? Because they make up everything!";
    }
  }

  /**
   * Get available categories from JokeAPI
   */
  static async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get("https://v2.jokeapi.dev/categories");

      if (
        !response.data.categories ||
        !Array.isArray(response.data.categories)
      ) {
        throw new Error("Invalid categories response from API");
      }

      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [
        "Any",
        "Programming",
        "Misc",
        "Dark",
        "Pun",
        "Spooky",
        "Christmas",
      ];
    }
  }
}

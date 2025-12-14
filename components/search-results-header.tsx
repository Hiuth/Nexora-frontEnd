"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResultsHeaderProps {
  query: string;
  totalResults: number;
  isLoading: boolean;
}

export function SearchResultsHeader({
  query,
  totalResults,
  isLoading
}: SearchResultsHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/products");
  };

  return (
    <Card className="border-0 shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -ml-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <SearchX className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Kết quả tìm kiếm
                </h1>
                <p className="text-sm text-gray-600">
                  Từ khóa: <span className="font-semibold">"{query}"</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {isLoading ? "Đang tìm..." : `${totalResults} kết quả`}
              </Badge>
              {!isLoading && totalResults === 0 && (
                <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                  Không tìm thấy
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
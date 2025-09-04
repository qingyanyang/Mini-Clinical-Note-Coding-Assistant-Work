import type { IParsedResponse, ICPT, IProblem } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Copy, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
interface IResultsTabs {
  analysisResults: IParsedResponse;
}
const ResultsTabs: React.FC<IResultsTabs> = ({ analysisResults }) => {
  const {
    data: { documentation, problems, icd10, billing },
  } = analysisResults;
  const { emLevel, cpt, hintSummary } = billing;

  const exportResults = () => {
    if (analysisResults) {
      const dataStr = JSON.stringify(analysisResults, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "medical-analysis-results.json";
      link.click();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!analysisResults) return <></>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Clinical Analysis Results
          </h2>
          <p className="text-gray-600 mt-1">
            AI-generated clinical documentation for review
          </p>
        </div>
        <Button
          onClick={exportResults}
          className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
      </div>

      <Tabs defaultValue="note" className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="note"
            className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700"
          >
            Note
          </TabsTrigger>
          <TabsTrigger
            value="codes"
            className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700"
          >
            Codes
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700"
          >
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="trace"
            className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700"
          >
            Trace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="note" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>SOAP Note</CardTitle>
                <CardDescription>
                  Structured clinical documentation
                </CardDescription>
              </div>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(JSON.stringify(documentation, null, 2))
                }
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Subjective
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {documentation.subjective}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Objective</h4>
                <p className="text-gray-700 leading-relaxed">
                  {documentation.objective}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">
                  Assessment
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {documentation.assessment}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Plan</h4>
                <p className="text-gray-700 leading-relaxed">
                  {documentation.plan}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Problem List & ICD-10 Codes</CardTitle>
                <CardDescription>
                  Suggested diagnostic codes for billing
                </CardDescription>
              </div>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(JSON.stringify(problems, null, 2))
                }
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {problems?.map((item: IProblem, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {icd10.join(", ")}: {item.rationale}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  E/M level and CPT code suggestions
                </CardDescription>
              </div>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(JSON.stringify(billing, null, 2))
                }
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-600 font-medium">
                    E/M Level
                  </p>
                  <p className="text-lg font-semibold text-emerald-700">
                    {emLevel}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">
                  Suggested CPT Codes
                </p>
                <div className="flex flex-wrap gap-2">
                  {cpt?.map((code: ICPT, index: number) => (
                    <div key={`${index}-${code.code}`}>
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-mono"
                      >
                        {code.code}
                      </span>
                      <span>{code.confidence}</span>
                      <span>{code.justification}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Complexity Level</p>
                <p className="font-medium text-gray-900">{hintSummary}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trace" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Analysis Trace</CardTitle>
                <CardDescription>
                  AI processing details and confidence metrics
                </CardDescription>
              </div>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    JSON.stringify(analysisResults.trace, null, 2)
                  )
                }
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent className="space-y-4"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsTabs;

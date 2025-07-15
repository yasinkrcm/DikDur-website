"use client";
import useAuth from "@/hooks/useAuth";
import { TrendingUp, Users, AlertTriangle, Award } from "lucide-react"
import Card from "@/components/Card"

export default function DashboardPage() {
  useAuth();
  const departments = [
    { name: "Engineering", score: 85, employees: 45, color: "bg-green-500" },
    { name: "Marketing", score: 78, employees: 23, color: "bg-blue-500" },
    { name: "Sales", score: 72, employees: 31, color: "bg-yellow-500" },
    { name: "HR", score: 91, employees: 12, color: "bg-green-600" },
    { name: "Finance", score: 68, employees: 18, color: "bg-orange-500" },
  ]

  const absenteeismData = [
    { month: "Jan", days: 45 },
    { month: "Feb", days: 38 },
    { month: "Mar", days: 52 },
    { month: "Apr", days: 41 },
    { month: "May", days: 35 },
    { month: "Jun", days: 29 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blue-light/20 to-blue-medium/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-2">Wellness Dashboard</h1>
          <p className="text-blue-dark/80 text-lg">Monitor your organization's health and wellness metrics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 bg-blue-light/30 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-dark" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-dark/70">Avg. Posture Score</p>
                <p className="text-2xl font-bold text-blue-dark">78.5</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100/80 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-dark/70">Active Employees</p>
                <p className="text-2xl font-bold text-blue-dark">129</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100/80 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-dark/70">Risk Alerts</p>
                <p className="text-2xl font-bold text-blue-dark">7</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cream/90 backdrop-blur-sm border-2 border-blue-light/50 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 bg-blue-medium/30 rounded-full">
                <Award className="h-6 w-6 text-blue-dark" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-blue-dark/70">Challenges Won</p>
                <p className="text-2xl font-bold text-blue-dark">23</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Posture Scores */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Posture Scores</h3>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                    <span className="font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm text-gray-500">({dept.employees} employees)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${dept.color}`} style={{ width: `${dept.score}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8">{dept.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Absenteeism Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Absenteeism Trends</h3>
            <div className="space-y-4">
              <div className="flex items-end space-x-2 h-40">
                {absenteeismData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.days / 60) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    <span className="text-xs font-semibold text-gray-900">{data.days}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">Sick days per month</p>
            </div>
          </Card>
        </div>

        {/* Ergonomics Reports Preview */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Ergonomics Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Assessment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action Required
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Anonymous Employee #1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Engineering</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      High
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 days ago</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                    Schedule Assessment
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Anonymous Employee #2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Marketing</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 week ago</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                    Follow-up Required
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

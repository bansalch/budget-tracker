import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const BudgetTracker = () => {
  const [currency, setCurrency] = useState('USD');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Housing', budgeted: 1500, actual: 1450, color: 'bg-blue-500' },
    { id: 2, name: 'Food', budgeted: 600, actual: 720, color: 'bg-green-500' },
    { id: 3, name: 'Transportation', budgeted: 400, actual: 380, color: 'bg-yellow-500' },
    { id: 4, name: 'Entertainment', budgeted: 200, actual: 250, color: 'bg-purple-500' },
    { id: 5, name: 'Utilities', budgeted: 300, actual: 280, color: 'bg-red-500' }
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, categoryId: 1, description: 'Rent', amount: 1200, date: '2025-07-01' },
    { id: 2, categoryId: 1, description: 'Home Insurance', amount: 250, date: '2025-07-05' },
    { id: 3, categoryId: 2, description: 'Groceries', amount: 450, date: '2025-07-03' },
    { id: 4, categoryId: 2, description: 'Restaurants', amount: 270, date: '2025-07-08' },
    { id: 5, categoryId: 3, description: 'Gas', amount: 180, date: '2025-07-02' },
    { id: 6, categoryId: 3, description: 'Car Maintenance', amount: 200, date: '2025-07-06' },
    { id: 7, categoryId: 4, description: 'Movies', amount: 50, date: '2025-07-04' },
    { id: 8, categoryId: 4, description: 'Streaming Services', amount: 200, date: '2025-07-01' },
    { id: 9, categoryId: 5, description: 'Electricity', amount: 150, date: '2025-07-01' },
    { id: 10, categoryId: 5, description: 'Water', amount: 130, date: '2025-07-01' }
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', budgeted: '', color: 'bg-indigo-500' });
  const [newExpense, setNewExpense] = useState({ categoryId: '', description: '', amount: '', date: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const colorOptions = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500',
    'bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
  ];

  const currencyOptions = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' }
  ];

  const getCurrencySymbol = () => {
    const selectedCurrency = currencyOptions.find(c => c.code === currency);
    return selectedCurrency ? selectedCurrency.symbol : '$';
  };

  const formatCurrency = (amount) => {
    const symbol = getCurrencySymbol();
    return symbol + amount.toLocaleString();
  };

  // Calculate actual spending for each category
  useEffect(() => {
    const updatedCategories = categories.map(category => {
      const categoryExpenses = expenses.filter(expense => expense.categoryId === category.id);
      const actualSpending = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      return { ...category, actual: actualSpending };
    });
    setCategories(updatedCategories);
  }, [expenses]);

  const addCategory = () => {
    if (newCategory.name && newCategory.budgeted) {
      const category = {
        id: Date.now(),
        name: newCategory.name,
        budgeted: parseFloat(newCategory.budgeted),
        actual: 0,
        color: newCategory.color
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', budgeted: '', color: 'bg-indigo-500' });
      setShowAddCategory(false);
    }
  };

  const addExpense = () => {
    if (newExpense.categoryId && newExpense.description && newExpense.amount && newExpense.date) {
      const expense = {
        id: Date.now(),
        categoryId: parseInt(newExpense.categoryId),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ categoryId: '', description: '', amount: '', date: '' });
      setShowAddExpense(false);
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setExpenses(expenses.filter(exp => exp.categoryId !== id));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const updateCategory = (id, updates) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
    setEditingCategory(null);
  };

  const getVariance = (budgeted, actual) => {
    return actual - budgeted;
  };

  const getVariancePercentage = (budgeted, actual) => {
    if (budgeted === 0) return 0;
    return ((actual - budgeted) / budgeted) * 100;
  };

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0);
  const totalVariance = totalActual - totalBudgeted;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Budget vs Actual Tracker</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium"
            >
              {currencyOptions.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.code} - {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Budgeted</h3>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalBudgeted)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Actual</h3>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalActual)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Variance</h3>
            <p className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {totalVariance >= 0 ? '+' : ''}{formatCurrency(Math.abs(totalVariance))}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Budget Health</h3>
            <p className={`text-2xl font-bold ${totalVariance <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalVariance <= 0 ? 'On Track' : 'Over Budget'}
            </p>
          </div>
        </div>

        {/* Category Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Budget Categories</h2>
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Category
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {categories.map(category => {
                    const variance = getVariance(category.budgeted, category.actual);
                    const variancePercentage = getVariancePercentage(category.budgeted, category.actual);
                    const progress = Math.min((category.actual / category.budgeted) * 100, 100);
                    
                    return (
                      <div key={category.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-500">
                                {formatCurrency(category.actual)} of {formatCurrency(category.budgeted)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                              variance <= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {variance <= 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                              {variance >= 0 ? '+' : ''}{formatCurrency(Math.abs(variance))}
                            </div>
                            <button
                              onClick={() => setEditingCategory(category.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${category.color} ${progress > 100 ? 'bg-red-500' : ''}`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>{progress.toFixed(1)}% used</span>
                            <span>{variancePercentage.toFixed(1)}% variance</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
                  <button
                    onClick={() => setShowAddExpense(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Expense
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {expenses.slice(-10).reverse().map(expense => {
                    const category = categories.find(cat => cat.id === expense.categoryId);
                    return (
                      <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${category?.color || 'bg-gray-400'}`}></div>
                          <div>
                            <p className="font-medium text-sm">{expense.description}</p>
                            <p className="text-xs text-gray-500">{category?.name} • {expense.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{formatCurrency(expense.amount)}</span>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Category Modal */}
        {showAddCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Add New Category</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Amount</label>
                  <input
                    type="number"
                    value={newCategory.budgeted}
                    onChange={(e) => setNewCategory({...newCategory, budgeted: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter budget amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        onClick={() => setNewCategory({...newCategory, color})}
                        className={`w-8 h-8 rounded-full ${color} ${newCategory.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddCategory(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addCategory}
                  className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Add New Expense</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newExpense.categoryId}
                    onChange={(e) => setNewExpense({...newExpense, categoryId: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter expense description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addExpense}
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;

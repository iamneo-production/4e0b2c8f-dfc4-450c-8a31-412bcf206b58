package com.example.springapp.budget;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetServiceImpl implements BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;


    /*public BudgetServiceImpl(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }*/

    @Override
    public List<Budget> getAllBudget() {
        return budgetRepository.findAll();
    }

    @Override
    public Optional<Budget> getBudgetById(Long id) {
        return budgetRepository.findById(id);
    }

    @Override
    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    @Override
    public Budget updateBudget(Long id, Budget budget) {
        Budget existingBudget = budgetRepository.findById(id).orElse(null);
        if (existingBudget == null) {
            return null;
        }

        existingBudget.setBudgetId(budget.getBudgetId());
        existingBudget.setCategory(budget.getCategory());
        existingBudget.setAmount(budget.getAmount());

        return budgetRepository.save(existingBudget);
    }

    @Override
    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }


}

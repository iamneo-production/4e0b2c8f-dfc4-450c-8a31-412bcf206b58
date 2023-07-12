package com.example.springapp.debt;

import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
@Transactional
@Service
public class DebtService {

    @Autowired
    private DebtRepo debtR;
    @Autowired
    UserRepository userRepository;
    public DebtEntity debtCreate(DebtEntity deb,String uName) {
        try{
            UserEntity user = userRepository.findByEmail(uName).orElseThrow();
            deb.setUser(user);
        }catch (Exception ignored){

        }
        return debtR.save(deb);
    }

    public DebtEntity debtUpdate(DebtEntity deb, Integer debtId) {
        DebtEntity debt = debtR.findById(debtId).get();

        if(!"0".equalsIgnoreCase(String.valueOf(deb.getAmount()))){
            debt.setAmount(deb.getAmount());
        }
        if(Objects.nonNull(deb.getMoneyFrom()) &&
                !"".equalsIgnoreCase(deb.getMoneyFrom())){
            debt.setMoneyFrom(deb.getMoneyFrom());
        }
        if(Objects.nonNull(deb.getStatus()) &&
                !"".equalsIgnoreCase(deb.getStatus())){
            debt.setStatus(deb.getStatus());
        }
        if(Objects.nonNull(deb.getDueDate()) &&
                !"".equalsIgnoreCase(deb.getDueDate())){
            debt.setDueDate(deb.getDueDate());
        }
        return debtR.save(debt);
    }

    public String debtDelete(Integer dId) {
        debtR.deleteById(dId);
        return "Deleted";
    }

    public List<DebtEntity> debtGet(String uName) {
        try {
            UserEntity user = userRepository.findByEmail(uName).orElseThrow();
            return debtR.findAllByUser(user);
        } catch (Exception e){
            return null;
        }
    }

    public List<DebtEntity> getAllDebts() {
        return debtR.findAll();
    }

    public  DebtEntity debtGetId(Integer dId ){
        return debtR.findById(dId).get();
    }
}

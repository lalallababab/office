package com.jzq.server.service.impl;

import com.jzq.server.pojo.Employee;
import com.jzq.server.mapper.EmployeeMapper;
import com.jzq.server.service.IEmployeeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author seven
 * @since 2023-02-19
 */
@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper, Employee> implements IEmployeeService {

}

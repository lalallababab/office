package com.jzq.server.service.impl;

import com.jzq.server.pojo.Department;
import com.jzq.server.mapper.DepartmentMapper;
import com.jzq.server.service.IDepartmentService;
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
public class DepartmentServiceImpl extends ServiceImpl<DepartmentMapper, Department> implements IDepartmentService {

}

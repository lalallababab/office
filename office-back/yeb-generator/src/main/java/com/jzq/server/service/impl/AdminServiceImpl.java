package com.jzq.server.service.impl;

import com.jzq.server.pojo.Admin;
import com.jzq.server.mapper.AdminMapper;
import com.jzq.server.service.IAdminService;
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
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin> implements IAdminService {

}

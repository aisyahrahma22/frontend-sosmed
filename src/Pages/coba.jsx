<div className='row'>
<ModalLogin
    modalOpen={this.state.modalOpen}
    handleModal={this.handleModalLogin}
/>
<div className='col-12 col-md-6 align-self-center'>
    <Link to="/" className='m' style={{ textDecoration: "none" }}>
        <h3 className='sefruit-main-dark px-3' >
            Sefruit
        </h3>
    </Link>
</div>
<div className="col-12 col-md-6">
    <div className='row'>
        <div className='col-4 sefruit-bg-main-light py-3'>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <FontAwesomeIcon icon={faBars} className='sefruit-font-size-20 sefruit-main-dark' />
            </div>
        </div>
        <div className='col-4 sefruit-bg-dark-grey py-3'>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <div className="position-relative">
                    <FontAwesomeIcon icon={faBasketShopping} className='sefruit-font-size-20 sefruit-main-dark' />
                    {
                        this.props.cart.length > 0 &&
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {this.props.cart.length}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    }
                </div>
            </div>
        </div>
        <div className='col-4 sefruit-bg-light-grey py-3'>
            <div className='d-flex flex-wrap justify-content-center align-items-center h-100 sefruit-main-dark'>
                {
                    this.props.username ?
                        <Dropdown isOpen={this.state.dropdownOpen}
                            toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}>
                            <DropdownToggle color='info' caret>
                                {this.props.username}
                            </DropdownToggle>
                            <DropdownMenu end>
                                {
                                    this.props.role == "Admin"
                                        ?
                                        <>
                                            <Link to="/manage-product" style={{ textDecoration: "none" }}>
                                                <DropdownItem>
                                                    Manage Products
                                                </DropdownItem>
                                            </Link>
                                            <DropdownItem>
                                                Manage Transactions
                                            </DropdownItem>
                                        </>
                                        :
                                        <DropdownItem>
                                            Transactions
                                        </DropdownItem>
                                }
                                <DropdownItem>
                                    Profile
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleLogout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        :
                        <>
                            <button
                                className="btn btn-outline-info"
                                onClick={this.handleModalLogin}
                            >
                                Login
                            </button>
                            <Link to="/register">
                                <button className="btn btn-light">Register</button>
                            </Link>
                        </>
                }
            </div>
        </div>
    </div>
</div>
</div>